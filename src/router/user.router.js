const Router = require('koa-router')
const useRouter = new Router({ prefix: '/users' })
const { verifyUser } = require('../middleware/user.middleware')
const { create } = require('../controller/user.controller')
useRouter.post('/', verifyUser, create)
module.exports = useRouter