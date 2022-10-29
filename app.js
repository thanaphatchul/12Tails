const express = require('express')
const app = express()
const port = 1800

var path = require('path');

var visitors = 0;
const fs = require('fs');

app.use(express.static(__dirname+ '/public'))

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})