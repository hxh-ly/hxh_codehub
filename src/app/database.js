const mysql = require('mysql2')
const config = require('./config')
const connections = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  user: config.MYSQL_USER,
  database: config.MYSQL_DATABASE,
  password: config.MYSQL_PASSWORD,
  connectionLimit: 10 //不会一次性创建
})
connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if (err) {
      console.log("连接数据库失败", err);
    } else {
      console.log("连接数据库成功");
    }
  })
})
module.exports = connections.promise()