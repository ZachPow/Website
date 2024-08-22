/*
This file sets up the functionality for the buttons that change the page.
The different buttons change the url
*/


const button_one = document.getElementById("Button1");
const button_two = document.getElementById("Button2");
const button_three = document.getElementById("Button3");

button_one.addEventListener("click", () => {
    location.href = "http://localhost:3000/";
})

button_two.addEventListener("click", () => {
    location.href = "http://localhost:3000/make_event";
})

button_three.addEventListener("click", () => {
    location.href = "http://localhost:3000/event_entry";
})