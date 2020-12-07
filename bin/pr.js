#!/usr/bin/env node

require('dotenv').config()
const axios = require('axios')
const yargs = require('yargs/yargs')

const run = async () => {
  const argv = yargs(process.argv).argv
  const accessToken = argv.GH_TOKEN || process.env.GH_TOKEN || ''
  if (!argv.owner || !argv.repo || !argv.pr) {
    console.log('wrong parameters. Try to pass: owner, repo and pr')
  } else {
    const { owner, repo, pr } = argv
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pr}`
    const result = await axios({
      method: 'get',
      url,
      headers: {
        Accept: 'application/json',
        Authorization: 'token ' + accessToken,
      },
    })
    if (result.data.merged) {
      console.log('pull request already merged')
      process.exitCode = 0
    } else {
      console.log('pull request not merged')
      process.exitCode = 1
    }
  }
}
run()
