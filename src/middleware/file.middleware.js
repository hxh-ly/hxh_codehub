const Multer = require('koa-multer')
const { AVATAR_PATH, PIC_PATH } = require('../constant/file-path')
const avatarUpload = new Multer({
  dest: AVATAR_PATH
})
const pictureUpload = new Multer({
  dest: PIC_PATH
})
const avatarHandler = avatarUpload.single('avatar')
const pictureHandler = pictureUpload.array('picture', 9)
module.exports = {
  avatarHandler,
  pictureHandler
}