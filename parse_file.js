import csv from 'csv-parser'
import fs from 'fs'

import { sendStudents } from './database.js'

const results = [];

let thing = fs.readFileSync("FinalList.csv", 'utf8');

thing = thing.split('\n');

thing.splice(0, 1);

const students = [];

for (const line of thing) {

    const elements = line.split(',');

    students.push({ name: elements[0], team: elements[1].trim(), id: parseInt(elements[2]), points: 0 });
}


sendStudents(students);
