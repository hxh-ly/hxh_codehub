const service = require('../service/comment.service')
class CommentController {
  async create(ctx, next) {
    const { commentId, content } = ctx.request.body
    const { id } = ctx.user
    const result = await service.create(commentId, content, id)
    ctx.body = result
  }
  async reply(ctx, next) {
    const { content, commentId } = ctx.request.body
    const { momentId } = ctx.params
    const { id } = ctx.user
    console.log("!!!!!!!!!!!",commentId);
    const result = await service.reply(commentId, content, id, momentId)
    ctx.body = result
  }
}
module.exports = new CommentController()