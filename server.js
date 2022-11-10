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

app.use(express.json());
app.use(express.urlencoded({extended: true}));

var HTTP_PORT = process.env.PORT || 8080;
function onHttpStart() 
{
    console.log("Express http server listening on " + HTTP_PORT);
}

app.get("/",(req,res)=>{
    let resText = "<h2>Declaration (text size in heading 2): </h2> ";
    resText += "<p> The rest text is displayed in paragraph as shown in screenshot. </p>";
    resText += " <p> I acknowledge the College’s academic integrity policy – and my own integrity ";
    resText += "– remain in effect whether my work is done remotely or onsite.";
    resText += " Any test or assignment is an act of trust between me and my instructor, ";
    resText += " and especially with my classmates… even when no one is watching.";
    resText += " I declare I will not break that trust. </p>";
    resText += "<p>Name: <mark> <b> Zijun Li </b> </mark> </p>";
    resText += "<p>Student Number: <mark><b> 170055214 </b> </mark> </p>";
    
    resText += `<ul>
                <li> <a href = "/CPA"> CPA Students </a></li>
                <li> <a href = "/highGPA"> Highest GPA </a></li>
                <li> <a href = "/allStudents"> All Students </a></li>
                <li> <a href = "/addStudent"> Add A New Student </a></li>
                <li> Note: Locate specific student by student Id, e.g., <br>
                 http://localhost:8080/student/3 </li>
                `

    res.send(resText);
});

app.get("/BSD", (req,res)=>{
    data_prep.bsd().then((data)=>{
        res.json(data);
    }).catch((reason)=>{
        res.json({message:reason});
    });
});

app.get("/CPA", (req,res)=>{
    data_prep.cpa().then((data)=>{
        res.json(data);
    }).catch((reason)=>{
        res.json({message:reason});
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
    data_prep.allStudents().then((data)=>{
        res.json(data);
    }).catch((reason)=>res.json({message:reason}));
});

app.get("/addStudent", (req, res)=>{
    res.sendFile(path.join(__dirname, "/test3_views/addStudent.html"));
});

app.post("/addStudent", (req, res)=>{
    data_prep.addStudent(req.body).then(()=>{
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
    data_prep.getStudent(req.params.studId).then((data)=>{
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

app.get("*", (req, res)=>{
    res.status(404).send("Error 404: page not found.")
});

data_prep.prep().then((data)=>{
    //console.log(data);
    app.listen(HTTP_PORT, onHttpStart);
}).catch((err)=>{
    console.log(err);
});