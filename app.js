const express = require('express')
const app = express()
const port = 1800

var path = require('path');

var visitors = 0;
const fs = require('fs');

var bodyParser = require('body-parser')


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
    visitors = visitors + 1
    console.log('user visted homepage', visitors)


    var options = {
        root: path.join(__dirname)
    };
    var fileName = '12tails.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})

var users = []

fs.readFile('users.json', 'utf8', (err, jsonString) => {
    const data = JSON.parse(jsonString)
    users = data;
})

app.get('/users', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    fs.readFile('users.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        console.log('File data:', jsonString)
        const data = JSON.parse(jsonString)
        res.status(200).json(data)
    })
})

app.post('/addUser', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    console.log('resulto', req.body)
    users.push(req.body)

    console.log('users', users)
    const data = JSON.stringify(users);
    fs.writeFile('users.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
        res.status(201).json(req.body)
    });
})

app.post('/clearUsers', (req, res) => {
    console.log('clear Users')
    users = []

    const data = JSON.stringify(users);
    fs.writeFile('users.json', data, (err) => {
        if (err) {
            throw err;
        }
        console.log("JSON data is saved.");
        res.status(201).json(req.body)
    });
})


app.get('/page2', (req, res) => {
    var options = {
        root: path.join(__dirname)
    };
    var fileName = '12tails.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})