const express = require('express')
const app = express()
const port = 1800

var path = require('path');
app.get('/', (req, res) => {
    var option ={
        root: path.join(__dirname)
    };
    var fileName = '12tails.html';
    res.sendFile(fileName, option, function(err) {
        if(err) {
            next(err);
        }else{
            console.log('sent:', fileName);
        }
    });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})