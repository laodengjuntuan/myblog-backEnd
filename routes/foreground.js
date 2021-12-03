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

let mouthInEnglish = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
function getDate(item) {
    let temp = new Date(Date.parse(item.time))
    let mouth = mouthInEnglish[temp.getMonth()]
    let year = temp.getFullYear()
    let day = temp.getDate()
    item.time = `${mouth} ${day}, ${year}`
}

router.use(express.static('public'));
router.route('/').get(function(req, res, next) {
    connection.query(`SELECT id, title, category, time FROM articles LIMIT 10`, function(err, result, field) {
        result.forEach((item) => {
            getDate(item)
        })
        res.render('home.ejs', { result: result, name: req.session.username })
      })
})

router.route('/article').get(function(req, res, next) {
    connection.query(`SELECT title, content, time FROM articles WHERE id = ${req.query.id}`, function(err, result, field) {
        result.forEach((item) => {
            getDate(item)
        })
        res.render('article.ejs', { article: result[0], name: req.session.username })
    })
})
module.exports = router