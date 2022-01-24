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
    const statement = `select m.id id,m.content content, m.createAt createTime, m.updateAt updateTime, JSON_OBJECT('id',u.id,'name',u.name,'avatarUrl',u.avatar_url )author,
    IF(COUNT(l.id), 
    JSON_ARRAYAGG(
     JSON_OBJECT('id',l.id,'name',l.name)
     ),null)
     labels,
    (SELECT IF(COUNT(c.id) ,JSON_ARRAYAGG(
      JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,
       'createTime',c.createAt, 
       'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatarUrl',cu.avatar_url) )
      ) ,NULL)
    FROM comment c LEFT JOIN users cu ON c.user_id = cu.id where m.id = c.moment_id ) comments,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
    from moment m 
     LEFT JOIN users u ON m.user_id =u.id  
    LEFT JOIN moment_label ml ON m.id = ml.moment_id
    LEFT JOIN label l ON l.id= ml.label_id
    where m.id = ?
    GROUP BY m.id
    ;`
    try {
      const [result] = await connections.execute(statement, [momentId])
      return result[0]
    } catch (error) {
      console.log(error);
    }

  }
  async getMomentList(offset, size) {
    const statement = `SELECT m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
    json_object('id',u.id,'name',u.name) author,
    (select count(*) from comment c where c.moment_id = m.id) as commentcount ,
    (select count(*) from moment_label ml where ml.moment_id = m.id) as labelcount ,
    (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',file.filename)) FROM file WHERE m.id = file.moment_id) images
     from moment m 
     LEFT JOIN users u on m.user_id = u.id LIMIT ?, ? ;`
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
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * from moment_label where moment_id =? and label_id = ?;`
    const [result] = await connections.execute(statement, [momentId, labelId])
    console.log(result);
    return result[0] ? true : false
  }
  async addLabel(momentId, labelId) {
    const statement = `insert into moment_label (moment_id,label_id) VALUES (?,?)`
    const [result] = await connections.execute(statement, [momentId, labelId])
    return result
  }
}
module.exports = new MomentService()