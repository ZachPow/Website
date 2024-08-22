/*
    This file is the middle man between the front end and back end. 
    Front end js files like eventEventLogic.js and those front end
    files use these functions to recieve information from the database.
 */


//information will be of type js object
export async function sendInfo(information) {

    console.log("information " + information);


    try {
        const response = await fetch("/api",
            {
                method: 'POST',
                body: JSON.stringify(information),
                headers: { "Content-Type": 'application/json' }
            });
    } catch (e) {

        console.log(e);
    }
}

//returns the list the entries from the db
//returns array of obj containing ID, name, Team, Points
export async function fetchEntries() {

    const response = await fetch("/api/people");

    const information = await response.json();

    return information.data;
}

export async function fetchEvents() {

    //gets the events data from the server
    const response = await fetch("/api/events");

    //turns response into json
    const information = await response.json();

    return information.data;
}