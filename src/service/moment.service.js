const connections = require('../app/database')
const sqlFragment = `
SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    json_object('id',u.id,'name',u.name) users
     from moment m LEFT JOIN users u on m.user_id = u.id
     `
class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO  moment (content,user_id) VALUES (?,?);`
    const result = await connections.execute(statement, [content, userId])
    return result
  }
  async getUserByName(name) {
    const statement = `SELECT *  from users WHERE name = ?;`
    const result = await connections.execute(statement, [name])
    //console.log("执行的结果是》。", result);
    return result[0]
  }
  async getMomentById(momentId) {
    const statement = `${sqlFragment}  WHERE m.id = ?;`
    const [result] = await connections.execute(statement, [momentId])
    return result[0]
  }
  async getMomentList(offset, size) {
    const statement = `${sqlFragment} LIMIT ?, ? ;`
    const [result] = await connections.execute(statement, [offset, size])
    return result
  }
  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id =?;`
    const [result] = await connections.execute(statement, [content, momentId])
    return result
  }
  async delete(momentId) {
    const statement = `delete from moment where id = ? `
    const [result] = await connections.execute(statement, [momentId])
    return result
  }
}
module.exports = new MomentService()