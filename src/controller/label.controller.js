const service = require('../service/label.service')
class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body
    console.log(name);
    const result = await service.create(name)
    ctx.body = result
  }
  async list(ctx, next) {
    const result = await service.list()
    ctx.body = result
  }
}
module.exports = new LabelController()