const connections = require('../app/database')
class AuthService {
 async checkMoment(momentId, userId) {
    try {
      const statement = 'select * from moment where id = ? AND user_id =?; '
      const [result] = await connections.execute(statement, [momentId, userId])
      return result.length === 0 ? false : true;
    } catch (err) {
        console.log(err);
    }
  }
}
module.exports = new AuthService()