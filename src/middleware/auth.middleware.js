const errorType = require('../constant/err-type')
const UserService = require('../service/user.service')
const md5password = require('../uitls/password-handle')
const verifyLogin = async (ctx, next) => {
  //1获取用户名 密码
  const { password, name } = ctx.request.body
  //2判断为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  //3判断存在
  const result = await UserService.getUserByName(name)
  const user = result[0]
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXIST)
    return ctx.app.emit('error', error, ctx)
  }
  //4判断密码一致
  if (md5password(password) != user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

module.exports = {
  verifyLogin
}