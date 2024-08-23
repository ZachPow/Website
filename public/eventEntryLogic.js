import { fetchEntries, sendInfo, fetchEvents } from './serverCommunication.js'

/**
 * This file contains all logic that's needed to EventEntry.ejs
 */


//the input block
const studentInput = document.querySelector(".dropDownButton");

const enterButton = document.getElementById("thing");

//container that holds all of the drop down items
const studentDropDown = document.querySelector(".content");

const eventDropDown = document.getElementById("eventContent");

const eventInput = document.getElementById("eventInput");

/*map each letter of the alphabet to a list of entries whose name
start with that letter e.g 'a' is mapped to [addison, ally...]*/
const firstLetterToName = new Map();
createMap();

var currentEvents = fetchEvents();



//waits for events then makes event options
currentEvents.then((events) => {
    for (const event of events) {
        addEventOption(event.type + " " + event.date);
    }
});



//studentInput is a html input
enterButton.addEventListener("click", () => {

    if (!cleanStudentInput({ name: studentInput.value })) {
        alert("Bad Input");
        return;
    };


    for(const child of eventDropDown.children){
        console.log(child.innerHTML);
    }
    alert("sent");
    sendInfo({ name: studentInput.value, event: eventInput.value, type: "Student" });
})





/*  
    listen for what key has been typed in the input box (studentInput)
    and have the apropriate drop downs pop up
*/
let firstLetter;

//studentInput is html Input tag
//when the user starts to type get 
studentInput.addEventListener('keyup', (e) => {

    if (studentInput.value) {

        //if the first letter hasn't changed just return
        if (studentInput.value[0] == firstLetter) {
            return;
        }

        firstLetter = studentInput.value[0].toLowerCase();

        if (!firstLetterToName.has(firstLetter)) {
            return;
        }

        removeCurrentDropDownOptions();

        //add the new drop down options
        for (const entry of firstLetterToName.get(firstLetter)) {
            addStudentOption(entry.Name);
        }
    }
})


//studentDropDown is a list of html buttons
function addStudentOption(name) {
    const newButton = document.createElement("button");

    //add this class so the css can be applied
    newButton.classList.add("listObj");

    newButton.innerHTML = name;

    /*
        if you click the drop down option
        change the input bar's value to the name
        that's attached to the drop down
        
        example: you click john smith so the input bar's value is john smith
    */
    newButton.addEventListener("click", () => {
        studentInput.value = name;
    })

    studentDropDown.appendChild(newButton);
}




function addEventOption(name) {
    const newButton = document.createElement("button");

    //add this class so the css can be applied
    newButton.classList.add("listObj");

    newButton.innerHTML = name;

    /*
        if you click the drop down option
        change the input bar's value to the name
        that's attached to the drop down
    */
    newButton.addEventListener("click", () => {
        eventInput.value = name;
    })

    eventDropDown.appendChild(newButton);
}

function removeCurrentDropDownOptions() {
    const parentNode = studentDropDown;

    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild);
    }
}


async function createMap() {

    const entries = await fetchEntries();

    //for every letter assign a empty list
    for (let i = 0; i < 26; i++) {
        firstLetterToName.set(String.fromCharCode(i + 97), []);
    }

    for (const entry of entries) {

        const firstLetter = entry.Name[0].toLowerCase();

        const arrayObj = firstLetterToName.get(firstLetter);

        arrayObj.push(entry);
    }

    return firstLetterToName;
}

//confirms that the input is a student not malicious code
//uses map to confirm help the look up
//if the input cannot be cleaned return false else return true
//input is a js obj with name 
function cleanStudentInput(input) {

    if (input.name == '') {
        return false;
    }

    //get first letter of the input
    const name = input.name;
    const fistLetter = name[0];

    let possibleEntries = [];

    //use map to narrow the search down
    if (!firstLetterToName.has(firstLetter.toLowerCase())) {
        return false;
    } else {
        possibleEntries = firstLetterToName.get(firstLetter);
    }

    for (const entry of possibleEntries) {

        const entryName = entry.Name;

        if (name == entryName) {
            return true;
        }
    }
    return false;
}
