const express = require('express')
const consign = require('consign')

const app = express()

consign({ cwd:  'src' })
  .include('common/middlewares/')
  .then('routes')
  .then('libs/boot.js')
  .into(app)

