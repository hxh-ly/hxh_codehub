const fs = require('fs')
const path = require('path')
const service = require('../service/file.service')
const { AVATAR_PATH, PIC_PATH } = require('../constant/file-path')
const { APP_HOST, APP_PORT } = require('../app/config')
const useService = require('../service/user.service')
const Jimp = require('jimp')
class FileController {
  async saveAvatarInfo(ctx, next) {
    //1 参数
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user
    //2 保存头像信息到file表
    const result = await service.createAvatar(filename, mimetype, size, id)
    //3 图像地址保存在user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/upload/${id}/avatar`
    await useService.updateAvatarById(id, avatarUrl)
    ctx.body = '用户上传头像成功了'
  }
  async savePictureInfo(ctx, next) {
    const files = ctx.req.files
    const { momentId } = ctx.query
    const { id } = ctx.user
    for (const file of files) {
      const { filename, mimetype, size } = file
      //service
      await service.createFile(filename, mimetype, size, id, momentId)
    }
    ctx.body = '动态配图完成'
  }
  async fileInfo(ctx, next) {
    try {
      let { filename } = ctx.params
      const fileRes = await service.getFileByFilename(filename)
      const { type } = ctx.query
      const types = ['large', 'middle', 'small']
      if (types.some(item => item === type)) {
        filename = filename + `-${type}`
      }
      ctx.response.set('content-type', fileRes.mimetype)

      ctx.body = fs.createReadStream(`${PIC_PATH}/${filename}`)
    } catch (error) {
      console.log(error);
    }

  }
  async resizePic(ctx, next) {
    try {
      const files = ctx.req.files
      console.log(files);
      for (const file of files) {
        const destPath = path.join(file.destination, file.filename)
        Jimp.read(file.path).then(image => {
          image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
          image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
          image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
        })
      }
      await next()
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = new FileController()