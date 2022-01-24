const service = require('../service/label.service')
const verifyLabelExists = async (ctx, next) => {
  const { labels } = ctx.request.body
  const newLabels = []
  try {
    for (const name of labels) {
      const labelResult = await service.ifExistLabel(name)
      const label = { name }
      if (!labelResult) {
        //创建标签
        const result = await service.create(name)
        label.id = result.insertId
      } else {
        //拿到有用的insertId 和待会的moment联系在一起
        label.id = labelResult.id
      }
      newLabels.push(label)
    }
    ctx.labels = newLabels
    await next()
  } catch (error) {
    console.log(error);
  }

}
module.exports = {
  verifyLabelExists
}