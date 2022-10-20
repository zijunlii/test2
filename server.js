/*************************************************************************
* WEB322– Test 2
* I declare that this assignment is my own work in accordance with Seneca Academic
Policy. No part * of this assignment has been copied manually or electronically from any
other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Zijun Li    Student ID: 170055214   Date: 10/06/2022
*
* Your app’s URL (from Cyclic) : App URL: https://vast-jade-goshawk-veil.cyclic.app
*
*************************************************************************/ 
var dataprep = require(__dirname + "/data_prep.js");

var express = require("express"); 

var app = express();

var path = require("path"); 
const { allStudents } = require("./data_prep");

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

app.get("/allStudents", (req, res) => {
    dataprep.allStudents().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get('/addStudent', (req, res) => {
    res.sendFile(path.join(__dirname + "/test3_views/addStudent.html"));
});

app.post('/addStudent', (req, res) => {
    const {fullName, studentId, program}  = req.body;
    res.send({fullName, studentId,program});
});

app.get("/getStudent", (req, res) => {
    dataprep.getStudent().then((data) => {
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