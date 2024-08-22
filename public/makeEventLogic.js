/*
    This file contains the logic for the eventTab.ejs.
    This is a front end js file.
*/


import { sendInfo } from "./serverCommunication.js";

const eventTypeInput = document.getElementById("eventInput");

//gets list of event options from the html
const eventOptions = document.getElementById("eventContent").children;

const dateInput = document.getElementById("DateInput");

const enterButton = document.getElementById("enterButton");

const monthToDay = new Map();

enterButton.addEventListener("click", () => {



    if (!checkEventInput(eventOptions.value)) {
        alert("something bad with event type");
        return;
    }

    if (!checkDate(dateInput.value)) {
        alert("bad")
        return;
    }

    const dateTemp = makeDate(dateInput.value);

    const obj = { date: dateTemp, eventType: eventTypeInput.value, type: "Event" };

    console.log("date " + obj.date);

    sendInfo(obj);

    console.log("sent info");
});







function makeDate(value) {

    let dateTemp = new Date(value);

    const dd = dateTemp.getDate();
    const mm = dateTemp.getMonth() + 1;
    const yyyy = dateTemp.getFullYear();

    return dateTemp;
}





function checkDate(value) {
    let dateTemp = new Date(dateInput.value);

    //bunch of checks that makes sure the user puts a valid date
    //valid date must be in mm/dd/yy format
    if (Object.prototype.toString.call(dateTemp) === "[object Date]") {
        if (isNaN(dateTemp.getTime())) {
            //date not valid
            alert("Bad date");
            return false;
        }

        const dd = dateTemp.getDate();
        const mm = dateTemp.getMonth() + 1;
        const yyyy = dateTemp.getFullYear();

        dateTemp = mm + "/" + dd + "/" + yyyy;
        console.log(mm + "/" + dd + "/" + yyyy);

        return true;
    } else {
        alert("bad date");
        return false;
    }
}

//makes sure the eventInput's value matches one of the eventOptions
function checkEventInput() {

    const value = eventTypeInput.value;

    for (const option of eventOptions) {

        if (option.innerHTML === value) {
            return true;
        }
    }

    alert("bad event input");

    return false;
}

//adds click event to each event option
for (const child of eventOptions) {

    child.addEventListener("click", () => {
        eventTypeInput.value = child.innerHTML;
    });
}



