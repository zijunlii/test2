const Sequelize = require('sequelize');

var sequelize = new Sequelize('lslravwy', 'lslravwy', '8NpyADIOzGo_-K3AAcCL6Fu1ZJ2YiWjd', { 
        host: 'peanut.db.elephantsql.com',     
        dialect: 'postgres',     
        port: 5432,     
        dialectOptions: { 
            ssl: true 
        }, query:{raw: true} // update here, you. Need this 
    });

sequelize.authenticate().then(()=> console.log('Connection success.')) 
.catch((err)=>console.log("Unable to connect to DB.", err));

var Student = sequelize.define('Student', {
    StudId: {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:Sequelize.STRING,
    program:Sequelize.STRING,
    gpa:Sequelize.FLOAT
});

exports.prep = ()=>{
    return new Promise((resolve,reject) => {
        sequelize.sync()
        .then(resolve())
        .catch(reject('unable to sync the database'));
    })
};

exports.bsd = ()=>{
    return new Promise((resolve, reject)=>{
       let results = students.filter(student => student.program == "BSD");
       (results.length == 0)? reject("No BSD students."):resolve(results);
    });
}


exports.cpa = ()=>{
    return new Promise((resolve, reject)=>{
       Student.findAll({
        where: {
            program: "CPA"
        }
       })
       .then(data => resolve(data))
       .catch('no results returned')
    });
}

exports.highGPA = ()=>{
    return new Promise((resolve, reject)=>{
        Student.findAll({
            where: {
                gpa: 4
            }
        })
        .then(data => resolve(data))
        .catch(err => reject(err))
        }) 
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

exports.allStudents =()=>{
    return new Promise((resolve, reject)=>{
        Student.findAll()
        .then(data => { resolve(data); })
        .catch(err => { reject(err); })
    })
};

exports.addStudent= (student)=>{
    return new Promise((resolve, reject)=>{
        Student.create(student).then(resolve(Student.findAll()))
        .catch(reject('unable to add the student'))
    })
};

exports.getStudent = (studId)=>{
    return new Promise((resolve, reject)=>{
        students.forEach(function(student){
            if (student.studId == studId)
                resolve(student);
        });
        reject("No result found!");
    })
}
