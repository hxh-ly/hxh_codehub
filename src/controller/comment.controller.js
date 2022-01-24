const service = require('../service/comment.service')
class CommentController {
  async create(ctx, next) {
    const { commentId, content } = ctx.request.body
    const { id } = ctx.user
    const result = await service.create(commentId, content, id)
    ctx.body = result
  }
  async reply(ctx, next) {
    const { content, momentId } = ctx.request.body
    const { commentId } = ctx.params
    const { id } = ctx.user
    const result = await service.reply(momentId, content, id, commentId)
    ctx.body = result
  }
  async update(ctx, next) {
    const { content } = ctx.request.body
    const { commentId } = ctx.params
    const result = await service.update(content, commentId)
    ctx.body = result
  }
  async deleteA(ctx, next) {
    const { commentId } = ctx.params
    console.log(commentId);
    const result = await service.delete(commentId)
    ctx.body = result
  }
  async list(ctx,next) {
    const {momentId} =ctx.query;
    const result =await service.getCommentByMomentId(momentId)
    ctx.body=result;
  }
}
module.exports = new CommentController()