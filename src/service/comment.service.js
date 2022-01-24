const connections = require('../app/database')
class CommentService {
  async create(momentId, content, id) {
    const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?)`
    const [result] = await connections.execute(statement, [content, momentId, id])
    return result
  }
  async reply(momentId, content, id, commentId) {
    const statement = `INSERT INTO comment (content,moment_id,user_id,comment_id) VALUES (?,?,?,?)`
    const [result] = await connections.execute(statement, [content, momentId, id, commentId])

    return result
  }
  async update(content, commentId) {
    const statement = 'UPDATE comment SET content = ? where id = ?'
    const [result] = await connections.execute(statement, [content, commentId])
    return result
  }
  async delete(commentId) {
    const statement = 'DELETE FROM comment where id = ?';
    const [result] = await connections.execute(statement, [commentId])
    return result
  }
  async getCommentByMomentId(momentId) {
    const statement = `SELECT m.id,m.content,m.comment_id commentId,m.createAt createTime,
    JSON_OBJECT('id',u.id,'name',u.name) users
    from comment m 
    LEFT JOIN users u ON u.id = m.user_id
     where moment_id = ?;`
    const [result] = await connections.execute(statement, [momentId])
    return result
  }
}
module.exports = new CommentService()