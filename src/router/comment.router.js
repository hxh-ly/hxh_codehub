const Router = require('koa-router')
const commentRouter = new Router({ prefix: '/comment' })
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { create, reply, update, deleteA, list } = require('../controller/comment.controller.js')
commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)
//修改评论
commentRouter.patch('/:commentId/update', verifyAuth, verifyPermission, update)
//删除评论
commentRouter.delete('/:commentId/delete', verifyAuth, deleteA)
//获取动态的所有评论
commentRouter.get('/', list)
module.exports = commentRouter