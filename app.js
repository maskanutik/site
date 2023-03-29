const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/default.json')
const mysql = require('mysql2')
const app = express()
const json = bodyParser.json()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/pages')
app.use('/pages', express.static('pages'))
app.use('/public', express.static('public'))


const connection = mysql.createConnection({
    host: config.database.host,
    port: config.database.port,
    user: config.database.login,
    password: config.database.password,
    database: config.database.nameDatabase
})
connection.connect((err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('database test connected')
    }
})



app.get('/', (req, res) => {
    res.render('index')
})
app.get('/members', (req, res) => {
    res.render('members')
});
app.get('/discography', (req, res) => {

    connection.query("SELECT*FROM shinee", (err, result) => {
        if (err) {
            res.sendStatus(400)
            console.log(err.message)
        } else {
            res.render('discography', {
                data: result
            })
        }
    })


})

app.get('/dontcallme', (req, res) => {
    res.render('dontcallme')
})
app.get('/gasoline', (req, res) => {
    res.render('gasoline')
})
app.get('/odd', (req, res) => {
    res.render('odd')
})
app.get('/pressit', (req, res) => {
    res.render('pressit')
})
app.get('/replay', (req, res) => {
    res.render('replay')
})
app.get('/sheis', (req, res) => {
    res.render('sheis')
})

app.get('/awards', (req, res) => {
    res.render('awards')
})
app.get('/newalbum', (req, res) => {
    res.render('newalbum', {
        data: {},
        errors: {}
    })
})

app.post('/newalbum', json, (req, res) => {
        let title = req.body.title
        let artist = req.body.artist
        let genre = req.body.genre
        let year = req.body.year

        let data = [title, artist, genre, year]
        let sql = "INSERT INTO shinee(title,artist,genre,year) VALUES(?,?,?,?)"
        connection.query(sql, data, err => {
            if (err) {
                res.sendStatus(400)
                console.log(err.message)
            } else {
                res.sendStatus(200)
            }
        })
})


app.listen(config.port, () => {
    console.log('server start')
})

