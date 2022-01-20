const jwt = require('jsonwebtoken')
const momentService = require('../service/moment.service')
const { PRIVATE_KEY, PUBLIC_KEY } = require("../app/config")
class MomentController {
  async create(ctx, next) {
    const id = ctx.user.id
    const content = ctx.request.body.content
    const res = await momentService.create(id, content)
    ctx.body = res
  }
  success(ctx, next) {
    ctx.body = '发表成功 '
  }
  async detail(ctx, next) {
    const momentId = ctx.params.momentId;
    const result = await momentService.getMomentById(momentId)
    ctx.body = result
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query
    const result = await momentService.getMomentList(offset, size)
    ctx.body = result
  }
  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const res = await momentService.update(content, momentId)
    ctx.body = res
  }
  async remove(ctx, next) {
    const { momentId } = ctx.params
    const res = await momentService.delete(momentId)
    ctx.body = res
  }
}
module.exports = new MomentController()