const service = require('../service/user.service')
class UserController {
  async create(ctx, next) {
    //获取用户的请求参数
    const user = ctx.request.body
    //查询数据
    const result = await service.create(user)
    //返回数据
    ctx.body = result
  }
  async getUserByName(ctx) {
    const { name } = ctx.request.body
    const result = await service
  }
}
module.exports = new UserController()