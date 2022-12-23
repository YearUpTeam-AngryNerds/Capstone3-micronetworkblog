"use strict";

window.onload = () => {
    document.getElementById("register").onclick = (event) => {
        console.log("Hello")
        // event.preventDefault();
        const fullName = document.getElementById("name").value;
        const username = document.getElementById("user").value;
        const password = document.getElementById("pw").value;
        const anyEmptyValues = Boolean(fullName) && Boolean(username) && Boolean(password);
        if(anyEmptyValues){
            const userData = {
                username: username,
                fullName: fullName,
                password: password
            };
            const requestBody = {
                method: "POST",
                headers: {  "Content-type" :"application/json" },
                body: JSON.stringify(userData)
            };
            fetch(`${api}/api/users`, requestBody)
            .then(response => response.json)
            .then(data => {
                window.location.assign("login.html");
            })
            .catch(err => console.log("Something went bad"));
        } else {
            console.log("Give me complete input");
        }
            
    }
}