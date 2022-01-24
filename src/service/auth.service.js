const connections = require('../app/database')
class AuthService {
  async checkResource(tableName, resourceId, userId) {
    try {
      const statement = `select * from ${tableName} where id = ? AND user_id =?;`
      const [result] = await connections.execute(statement, [resourceId, userId])
      return result.length === 0 ? false : true;
    } catch (err) {
      console.log(err);
    }
  }
}
module.exports = new AuthService()