const ErrorType = require('../constant/err-type')
const errorHandle = (error, ctx) => {
  let status, message;
  switch (error.message) {
    case ErrorType.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 404;
      message = '用户名或密码不能为空'
      break;
    case ErrorType.USER_ALREADY_EXIST:
      status = 409;
      message = '用户名已存在'
      break;
    default:
      status = 404;
      message = 'not found';
  }
  ctx.status = status
  ctx.body = message
}
module.exports = errorHandle