const connection = require('../app/database')
class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    try {
      const statement = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES(?,?,?,?);`
      const [result] = await connection.execute(statement, [filename, mimetype, size, userId])
      return result
    } catch (error) {
      console.log(error);
    }

  }
  async getAvatarByUserId(userId) {
    const statement = 'SELECT * from avatar where user_id = ?;'
    const [result] = await connection.execute(statement, [userId])
    return result
  }
  async createFile(filename, mimetype, size, userId, momentId) {
    console.log(filename, mimetype, size, userId, momentId);
    const statement = `INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES(?,?,?,?,?);`
    const [result] = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
    return result
  }
  async getFileByFilename(filename) {
    try {
      const statement = `select * from file where filename = ?;`
      const [result] = await connection.execute(statement, [filename])
      return result[0]
    } catch (error) {
      console.log(error);
    }

  }
}
module.exports = new FileService()