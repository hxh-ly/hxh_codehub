const Router = require('koa-router')
const { verifyAuth } = require('../middleware/auth.middleware')
// process.cwd
const { avatarHandler,pictureHandler} = require('../middleware/file.middleware')
const { saveAvatarInfo,savePictureInfo,resizePic} = require('../controller/file.controller')
const { avatarInfo } = require('../controller/user.controller')
const fileRouter = new Router({ prefix: '/upload' });
//上传的图片怎么保存到服务器
fileRouter.post('/avatar', verifyAuth, avatarHandler, saveAvatarInfo)
//获取头像信息的接口
fileRouter.get('/:userId/avatar', avatarInfo)
//上传动态配图接口
fileRouter.post('/picture',verifyAuth,pictureHandler,resizePic,savePictureInfo)
module.exports = fileRouter