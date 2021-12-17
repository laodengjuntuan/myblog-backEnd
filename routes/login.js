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

router.get('/', express.static('public/login'))
router.post('/', function(req, res, next) {
    let user = req.body
    connection.query(`SELECT password FROM users WHERE name='${user.name}'`, function(err, result, field) {
        let password = result[0].password
        if (user.password == password) {
          req.session.username = user.name
            res.send(user.name)
        } else {
            res.send('wrong')
        }
      })
})

module.exports = router