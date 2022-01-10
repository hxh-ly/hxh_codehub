class AuthController {
  login(ctx, next) {
    const { name, password } = ctx.request.body
    ctx.body=`登录成功 ${name}`
  }
}
module.exports = new AuthController()