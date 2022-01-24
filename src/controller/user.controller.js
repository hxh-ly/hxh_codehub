const fs = require('fs')
const { AVATAR_PATH } = require('../constant/file-path')
const service = require('../service/user.service')
const fileService = require('../service/file.service')
class UserController {
  async create(ctx, next) {
    //获取用户的请求参数
    const user = ctx.request.body
    //查询数据
    const result = await service.create(user)
    //返回数据
    ctx.body = result
  }
  async avatarInfo(ctx, next) {
    const { userId } = ctx.params
    //查到图片信息
    const [avatarInfo] = await fileService.getAvatarByUserId(userId)
    //展示在网页上
    console.log(avatarInfo);
    ctx.response.set('content-type',avatarInfo.mimeType)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}
module.exports = new UserController()