const express = require('express');    
const path = require('path');     
const app = express();      
const PORT = process.env.PORT || 1800; 

app.use(express.static(__dirname));   
app.use('/', function (req, res, next) {  

    var options = {      
        root: path.join(__dirname)   
    };
    var fileName = '12tails.html';    
    res.sendFile(fileName, options, function (err) { 
        if (err) {      
        } else {
            console.log('Sent:', fileName);   
            next();
        }
    });
});

app.listen(PORT, function (err) {    
    if (err) console.log(err);    
    console.log("Server listening on PORT", PORT); 
});

app.get('/', function (req, res) {   
    console.log("File Sent")     
    res.send();
});