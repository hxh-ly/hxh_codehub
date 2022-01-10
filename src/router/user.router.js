const Router = require('koa-router')
const useRouter = new Router({ prefix: '/users' })
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const { create } = require('../controller/user.controller')
useRouter.post('/', verifyUser, handlePassword, create)
module.exports = useRouter