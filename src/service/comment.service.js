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
}
module.exports = new CommentService()