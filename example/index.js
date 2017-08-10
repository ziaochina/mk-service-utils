const { config, start } = require("mk-server")
const serverConfig = require("./config")

const test = require("./services/test/index.js")
const utils = require("./services/utils/index.js")

const services = { 
    utils,
    test,
}

config(serverConfig({ services }))

start()