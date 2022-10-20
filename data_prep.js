const file = require('fs');

var students = [];
var high = [];
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

exports.highGPA = () => {
    var max = Math.max(...students.map(item => item.gpa));
    return new Promise ((resolve, reject) => {
        if (students.length == 0) {
            reject('no results returned');
        }
        else {
            for (let i = 0; i < students.length; i++){
                if (students[i].gpa == max){
                    high = students[i];
                }
            }
        }
        resolve(high);
    })
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

exports.getStudent = () => {
    return new Promise ((resolve,reject) => {
        if (students.length == 0) {
            reject('no results returned');
        }
        else {
            resolve(students);
        }
    })
};