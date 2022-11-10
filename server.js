/*************************************************************************
* WEB322– Test 3
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
var express = require("express");
var app = express();
var data_prep = require("./data_prep.js");
var path = require("path");
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() 
{
    console.log("Express http server listening on " + HTTP_PORT);
}

app.engine('.hbs', exphbs.engine({ 
    extname: ".hbs"
}));

app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get("/BSD", (req,res)=>{
    data_prep.bsd().then((data)=>{
        res.json(data);
    }).catch((reason)=>{
        res.json({message:reason});
    });
});

app.get("/CPA", (req,res)=>{
    data_prep.cpa(req.query.status).then((data)=>{
        res.render("students",{students: data});
    }).catch((err)=>{
        res.render({message: "no results"});
    });
});

app.get("/highGPA", (req, res)=>{
    data_prep.highGPA().then((data)=>{
        let resText = `<h2> Highest GPA: </h2>
        <p> Student ID: ${data.studId} </p>
        <p> Name:  ${data.name} </p>
        <p> Program: ${data.program} </p>
        <p> GPA: ${data.gpa} </p> `;
        res.send(resText);
    });
});

app.get("/allStudents", (req, res)=>{
    data_prep.allStudents(req.query.status).then((data)=>{
        res.render("students",{students: data});
    }).catch((err)=>{
        res.render({message: "no results"});
    });
});

app.get("/addStudent", (req, res)=>{
    res.sendFile(path.join(__dirname, "/test3_views/addStudent.html"));
});

app.post("/addStudent", (req, res)=>{
    data_prep.addStudent(req.body).then(()=>{
        res.redirect('allStudents');
    })
});

app.get("/student/:studId",(req, res)=>{
    data_prep.getStudent(req.params.studId).then((data)=>{
        res.render("student",{students: data});
    }).catch((err)=>{
        res.render("student",{message: "no results"});
    })
});

app.get("*", (req, res)=>{
    res.status(404).send("Error 404: page not found.")
});

data_prep.prep().then((data)=>{
    //console.log(data);
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err)=>{
    console.log(err);
});