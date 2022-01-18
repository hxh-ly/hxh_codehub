const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const errorHandler = require('../app/error-handle')
const app = new Koa()
const useRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
const useRoutes = require('../router')
app.useRoutes = useRoutes
app.use(bodyParser())
app.useRoutes()
app.on('error', errorHandler)
module.exports.app = app