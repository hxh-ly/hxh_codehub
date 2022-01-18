const Router = require('koa-router')
const momentRouter = new Router({ prefix: '/moment' })
const { success, create,detail,list } = require('../controller/moment.controller.js')
const { verifyAuth } = require('../middleware/auth.middleware')
momentRouter.post('/', verifyAuth, create)
momentRouter.get('/',list)
momentRouter.get('/:momentId',detail)
module.exports = momentRouter