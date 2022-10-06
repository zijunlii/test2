/*************************************************************************
* WEB322– Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Zijun Li    Student ID: 170055214   Date: 10/01/2022
*
* Your app’s URL (from Cyclic) : https://crazy-pear-dhole.cyclic.app
*
*************************************************************************/ 
var dataprep = require(__dirname + "/data_prep.js");

var express = require("express"); 

var app = express();

var path = require("path"); 

var HTTP_PORT = process.env.PORT || 8080; 

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/home.html"));
});

app.get("/CPA", (req, res) => {
    dataprep.cpa().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/highGPA", (req, res) => {
    dataprep.highGPA().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.use((req, res) => {
    let resText = "<h2> SORRY 404 PAGE NOT FOUND </h2> <br>";
    resText += "<a href = './'> Back to Home </a> <br>";
    res.send(resText);
});

dataprep.prep().then(() => {
    app.listen(HTTP_PORT, onHttpStart());
}).catch (() => {
    console.log('Sorry error.');
});