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

router.use(express.static('public'));
router.route('/').get(function(req, res, next) {
    let mouthInEnglish = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    connection.query(`SELECT id, title, category, time FROM articles LIMIT 10`, function(err, result, field) {
        result.forEach((item) => {
            let temp = new Date(Date.parse(item.time))
            let mouth = mouthInEnglish[temp.getMonth()]
            let year = temp.getFullYear()
            let day = temp.getDate()
            item.time = `${mouth} ${day}, ${year}`
        })
        res.render('home.ejs', { result: result })
      })
})

router.route('/article').get(function(req, res, next) {
    connection.query(`SELECT title, content, time FROM articles WHERE id = ${req.query.id}`, function(err, result, field) {
        let mouthInEnglish = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        result.forEach((item) => {
            let temp = new Date(Date.parse(item.time))
            let mouth = mouthInEnglish[temp.getMonth()]
            let year = temp.getFullYear()
            let day = temp.getDate()
            item.time = `${mouth} ${day}, ${year}`
        })
        res.render('article.ejs', { article: result[0] })
    })
})
module.exports = router