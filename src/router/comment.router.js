const Router = require('koa-router')
const commentRouter = new Router({ prefix: '/comment' })
const { verifyAuth } = require('../middleware/auth.middleware')
const { create,reply} = require('../controller/comment.controller.js')
commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:momentId/reply', verifyAuth, reply)
module.exports = commentRouter