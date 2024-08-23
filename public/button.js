/*
This file sets up the functionality for the buttons that change the page.
The different buttons change the url
*/


const button_one = document.getElementById("Button1");
const button_two = document.getElementById("Button2");
const button_three = document.getElementById("Button3");

button_one.addEventListener("click", () => {
    location.href = "https://website-9pt5.onrender.com/";
})

button_two.addEventListener("click", () => {
    location.href = "https://website-9pt5.onrender.com/make_event";
})

button_three.addEventListener("click", () => {
    location.href = "https://website-9pt5.onrender.com/event_entry";
})