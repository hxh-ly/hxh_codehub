const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, PUBLIC_KEY } = require("../app/config")
class AuthController {
  login(ctx, next) {

    const { id, name } = ctx.user
    console.log(PRIVATE_KEY);
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })
    ctx.body = {
      id,
      name,
      token
    }
  }
  success(ctx, next) {
    ctx.body='授权成功'
  }
}
module.exports = new AuthController()