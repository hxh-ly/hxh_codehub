const connections = require('../app/database')
class UserService {
  async create(user) {
    //将user数据保存到数据库
    const { name, password } = user
    const statement = `INSERT INTO users (name,password) VALUES (?,?);`
    const result = await connections.execute(statement, [name, password])
    return result
  }
  async getUserByName(name) {
    const statement = `SELECT *  from users WHERE name = ?;`
    const result = await connections.execute(statement, [name])
    //console.log("执行的结果是》。", result);
    return result[0]
  }
}
module.exports = new UserService()