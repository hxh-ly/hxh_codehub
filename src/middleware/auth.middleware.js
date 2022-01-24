const { PUBLIC_KEY } = require('../app/config')
const jwt = require('jsonwebtoken')
const errorType = require('../constant/err-type')
const UserService = require('../service/user.service')
const AuthService = require('../service/auth.service')
const md5password = require('../uitls/password-handle')
const verifyLogin = async (ctx, next) => {
  //1获取用户名 密码
  const { password, name } = ctx.request.body
  console.log(password,name);
  //2判断为空
  if (!name || !password) {
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  //3判断存在
  const result = await UserService.getUserByName(name)
  console.log(result);
  const user = result[0]
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXIST)
    return ctx.app.emit('error', error, ctx)
  }
  //4判断密码一致
  //console.log(md5password(password));
  if (md5password(password) != user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRECT)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  //1 拿到token
  const authorization = ctx.headers.authorization
 ///console.log('登录authorization',authorization);
  if (!authorization) {
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
  const token = authorization.replace('Bearer ', '')
  //2 jwt
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    console.log('user`````````````````',result);
    ctx.user = result
    await next()
  } catch (err) {
    console.log('verifyAuth',err);
    const error = new Error(errorType.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }
}
const verifyPermission = async (ctx, next) => {
  const [recourseKey] = Object.keys(ctx.params)
  console.log(recourseKey);
  const tableName = recourseKey.replace('Id', '')
  const recourseId = ctx.params[recourseKey]
  const { id } = ctx.user
  console.log('~~~~~~~~~', recourseId);
  try {
    const permission = await AuthService.checkResource(tableName, recourseId, id)
    if (!permission) throw new Error()
    await next()
  } catch (err) {
    console.log(err);
    const error = new Error(errorType.UNPERMISSION)
    return ctx.app.emit("error", error, ctx)
  }
}
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}