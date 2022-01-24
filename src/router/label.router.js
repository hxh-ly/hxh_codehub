const Router = require('koa-router')
const labelRouter = new Router({ prefix: '/label' })
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { create, list } = require('../controller/label.controller')
labelRouter.post('/', verifyAuth, create)
labelRouter.get('/', verifyAuth, list)
module.exports = labelRouter