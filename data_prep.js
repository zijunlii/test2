var file = require('fs');

var students = [];
var cpa = [];
let j = 0;

exports.prep = () => {
    return new Promise ((resolve, reject) => {
        file.readFile('./students.json', (err,data) => {
            if (err) {
                reject ('Failure to read file students.json!');
            }
            else {
                students = JSON.parse(data);
            }
        });
        resolve();
    })
};

exports.bsd = ()=>{
    return new Promise((resolve, reject)=>{
       let results = students.filter(student => student.program == "BSD");
       (results.length == 0)? reject("No BSD students."):resolve(results);
    });
}

exports.cpa = () => {
    return new Promise ((resolve,reject) => {
        if (students.length == 0) {
            reject('no results returned');
        }
        else {
            for (let i = 0; i < students.length; i++){
                if (students[i].program == 'CPA'){
                    cpa[j] = students[i];
                    j++;
                }
            }
            resolve(cpa);
        }
    })
};

exports.highGPA = ()=>{
    return new Promise((resolve, reject)=>{
        let high = 0;
        let highStudent;
        
        for (let i=0; i<students.length; i++)
        {
            //console.log(students[i].gpa, high);
            if (students[i].gpa > high)
            {
                high = students[i].gpa;
                highStudent = students[i];
            }
        }
        (highStudent) ? resolve(highStudent): reject("Failed finding student with highest GPA");
    }); 
};

exports.lowGPA = ()=>{
    return new Promise((resolve, reject)=>{
        let low = 4.0;
        let lowStudent;
        for (let i=0; i<students.length; i++)
        {
            if (students[i].gpa < low)
            {
                low = students[i].gpa;
                lowStudent = students[i];
            }
        }
        resolve(lowStudent);
    }); 
};

exports.allStudents = () => {
    return new Promise ((resolve,reject) => {
        if (students.length == 0) {
            reject('no results returned');
        }
        else {
            resolve(students);
        }
    })
};

exports.addStudent = (stud)=>{
    return new Promise((resolve, reject)=>{
        stud.studId = students.length+1;
        students.push(stud);
        resolve();
    });
}

exports.getStudent = (studId)=>{
    return new Promise((resolve, reject)=>{
        students.forEach(function(student){
            if (student.studId == studId)
                resolve(student);
        });
        reject("No result found!");
    })
}