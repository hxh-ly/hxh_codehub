const errorType = require('../constant/err-type')
const UserService = require('../service/user.service')
const verifyUser = async (ctx, next) => {
  //1获取用户名密码
  const { name, password } = ctx.request.body
  console.log(name, password);
  //2用户名密码不能为空
  if (!name || !password || name == '' || password == '') {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  //3用户名重复
  const result = await UserService.getUserByName(name)
  if (result.length) {
    const error = new Error(errorType.USER_ALREADY_EXIST)
    return ctx.app.emit('error', error, ctx)
  }
  //4通过
  await next()
}
module.exports = {
  verifyUser
}
