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

router.get('/', express.static('public/background'));

router.route('/articleList')
      .get(function(req, res, next) {
        connection.query(`SELECT id, title, category, time FROM articles LIMIT ${req.query.len}`, function(err, result, field) {
          res.send(result)
        })
      })
      .delete(function(req, res, next) {
        connection.query(`DELETE FROM articles WHERE id = ${req.query.del}`)
      })

router.route('/article')
      .get(function(req, res, next) {
        connection.query(`SELECT * FROM category`, function(err, result, field) {
          res.send(result)
        })
      })
      .post(function(req, res, next) {
        connection.query(`INSERT INTO articles (title, content, category, time) VALUES ("${req.body.title}", "${req.body.content}", "${req.body.category}", NOW())`)
      })

router.route('/category')
      .get(function(req, res, next) {
        connection.query(`SELECT * FROM category`, function(err, result, field) {
          res.send(result)
        })
      })
      .post(function(req, res, next) {
        connection.query(`INSERT INTO category (name) VALUES("${req.body.name}")`)
      })
      .delete(function(req, res, next) {
        connection.query(`DELETE FROM category WHERE id = ${req.query.del}`)
      })

router.route('/comments')
      .get(function(req, res, next) {
        res.send('comments')
      })
      .post(function(req, res, next) {
        console.log(req.body)
        res.send('comments post')
      })



module.exports = router;
