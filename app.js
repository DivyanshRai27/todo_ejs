//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function(req,res){
    var today = new Date();

    if (today.getDay() === 6 || today.getDay() === 0) {
        res.send("Yay, its the weekend")
    } else {
        res.sendFile(__dirname + '/index.html')
    }
});

app.listen(3000, function(){
    console.log("Server started on 3000")
})