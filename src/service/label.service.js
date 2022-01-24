const connections = require('../app/database')
class labelService {
  async create(labelName) {
    const statement = `INSERT INTO label (name) VALUES(?);`
    const [result] = await connections.execute(statement, [labelName])
    return result
  }
  async ifExistLabel(name) {
    const statement = 'select * from label where name = ?;'
    const [result] = await connections.execute(statement, [name])
    return result[0]
  }
  async list() {
    const statement = 'select * from label ;'
    const [result] = await connections.execute(statement)
    return result
  }
}
module.exports = new labelService()