const express = require('express')
const router = express.Router()
const mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  password : '123456',
  database : 'blog'
})
connection.connect()

router.post('/', function(req, res, next) {
    let user = JSON.parse(req.body)
    connection.query(`SELECT password FROM users WHERE name='${user.name}'`, function(err, result, field) {
        let password = result[0].password
        if (user.password == password) {
          req.session.username = user.name
            res.send('http://localhost:2999/background')
        } else {
            res.send('wrong')
        }
      })
})

module.exports = router