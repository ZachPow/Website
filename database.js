/* This file acts as an library file. It contains functions 
that interact with the database. The server file uses these functions
*/

import mysql from 'mysql2'

//establish connection to database
const pool = mysql.createPool({
    //host: "database-1.cej38k9gvsei.us-east-2.rds.amazonaws.com",
    host: "mydb.cej38k9gvsei.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "Zachalex622",
    database: "SpiritPoints"
}).promise()


//const [rows] = await pool.query("select * from students")







//gets a list of names from the database
//then iterates on each row and pushes it to an array: 'names'
export async function getNames() {
    const [rows] = await pool.query("select * from Students order by Team")

    let names = []

    rows.forEach((item) => {
        names.push(" " + item.Name)
    })


    return names;
}




export async function getPeople() {

    const [rows] = await pool.query("select * from Students order by name");

    return rows;
}
//server calls sendEvent
export async function sendEvent(event) {

    console.log("attempted to write into db " + event.type);

    const sql = "INSERT INTO Events (type, date) VALUES (\"" + event.eventType + "\", \"" + event.date + "\");";

    pool.query(sql);
}

export async function incrementPerson(person) {

    let sql = "Select points from Students where name = \'" + person.name + "\';";

    let [queriedPerson] = await pool.query(sql);

    let points = queriedPerson[0].points;

    points += 10;

    sql = "UPDATE Students SET points = " + points + " WHERE name = \'" + person.name + "\';";

    pool.query(sql).then((err, other) => {

        if (err) {
            console.log(err);
        }
    });

}

//insert into students (StudentID, Name,Team,Points) VALUES (12, "bob", "blue", 2);

//INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')"
export async function sendStudents(students) {

    var sql = 'insert into Students (StudentID, Name,Team,Points) VALUES (102, "bob", "blue", 10);';

    for (const student of students) {

        sql = 'insert into Students (StudentID, Name,Team,Points) VALUES (' + student.id + ", \"" + student.name + "\", \"" + student.team + "\", " + student.points + ");";

        console.log("sql: " + sql);

        pool.query(sql);

        console.log(student);

    }
}

export async function getEvents() {

    var sql = "select * from Events";

    const [rows] = await pool.query(sql);

    return rows;
}