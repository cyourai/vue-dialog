'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PREFIX: '"/api"',
  ZUUL: '"/zuul"',
  // 开发人员本地
  // BASE_API: '"http://219.142.70.16:8888"'
  // BASE_API: '"http://39.104.87.198:8888"'
  // BASE_API: '"http://192.168.11.168:8888"'
  // BASE_API: '"http://192.168.11.167:8888"'
  // BASE_API: '"http://192.168.7.12:8888"'
  BASE_API: '"http://localhost:8888"'
})
