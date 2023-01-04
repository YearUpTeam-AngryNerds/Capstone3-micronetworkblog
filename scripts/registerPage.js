"use strict";

window.onload = () => {
    document.getElementById("registerForm").onsubmit = (event) => {
        //prevent the form from refreshing the page
        event.preventDefault();

        const userData = {
            username: username,
            fullName: fullName,
            password: password
        };
        const requestBody = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(userData)
        };
        fetch(`${api}/api/users`, requestBody)
            .then(response => response.json)
            .then(data => {
                window.location.assign("login.html");
            })
            .catch(err => console.log("Something went bad"));


    }
}