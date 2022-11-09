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

var HTTP_PORT = process.env.PORT || 8080; 

function onHttpStart(){
    console.log("Express http server listening on: " + HTTP_PORT);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/home.html"));
});

app.get("/BSD", (req,res)=>{
    dataprep.bsd().then((data)=>{
        res.json(data);
    }).catch((reason)=>{
        res.json({message:reason});
    });
});

app.get("/CPA", (req, res) => {
    dataprep.cpa().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/highGPA", (req, res)=>{
    dataprep.highGPA().then((data)=>{
        let resText = `<h2> Highest GPA: </h2>
        <p> Student ID: ${data.studId} </p>
        <p> Name:  ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p> `;
        res.send(resText);
    });
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

app.post("/addStudent", (req, res)=>{
    dataprep.addStudent(req.body).then(()=>{
        var data = req.body;
        var txt =  ` <h2 style="color:red;"> The New Student Information  </h2>
        <p> Student id: ${data.studId}</p>
         <p> Student name: ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p>
        <a href="/allStudents"> All Students </a> <br>
        <a href="/"> Go Home </a>
        `;
        res.send(txt);
        //res.redirect("/allStudents");

    }).catch((reason)=>res.json({message:reason}));
});

app.get("/student/:studId",(req, res)=>{
    dataprep.getStudent(req.params.studId).then((data)=>{
        var txt = `
        <h2 style="color:red;"> This Student Information  </h2>
        <p> Student id: ${data.studId}</p>
        <p> Student name: ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p>
        <a href="/allStudents"> Show All Students </a> <br>
        <a href="/"> Go Home </a>
        `;
        res.send(txt);
       // res.json(data);
       // {"studId":3,"name":"name3","program":"BSD","gpa":3.3}
    }).catch((reason)=>res.json({message:reason}));
});

app.use((req, res) => {
    let resText = "<h2> SORRY 404 PAGE NOT FOUND </h2> <br>";
    resText += "<a href = '/'> Back to Home </a> <br>";
    res.send(resText);
});

dataprep.prep().then(() => {
    app.listen(HTTP_PORT, onHttpStart());
}).catch (() => {
    console.log('Sorry error.');
});