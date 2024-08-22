/*
    This is the server file that sets up express and uses functions from database.js
    to interact with the database
*/


import express from "express"

const app = express()
const port = 3000

import { getNames, getPeople, sendEvent, sendStudents, getEvents, incrementPerson } from './database.js'

app.use(express.json())

app.set("view engine", "ejs")

var people = await getPeople();

var events = await getEvents();


//continual refresh information from the database
async function resetPeople() {
    people = await getPeople();
}
async function resetEvents() {
    events = await getEvents();
}

setInterval(resetEvents, 100);
setInterval(resetPeople, 100);

app.get('/api/people', (req, res) => {
    res.json({ data: people });
});

app.get('/api/events', (req, res) => {
    res.json({ data: events });
});
app.get('/', (req, res) => {

    res.render('viewTab', { people: people })

});

app.get('/make_event', (req, res) => {
    res.render('eventTab');
})

app.get('/event_entry', (req, res) => {
    res.render('eventEntry', { people: people });
})


//post calls will come in and this handles them
//req.body is a js object with a type attribute
//type will equal wither Event or Student
app.post('/api', (req, res) => {
    console.log('post recived');

    console.log(req.body);
    //console.log(req.body.type);

    if (req.body.type === 'Event') {
        console.log('event post');

        //this function exists in database.js
        sendEvent(req.body);
    } else if (req.body.type === 'Student') {
        incrementPerson(req.body);
    }

    res.sendStatus(200);
})

app.use(express.static('public'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})