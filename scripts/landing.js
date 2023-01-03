/* Landing Page JavaScript */

"use strict";

const loginForm = document.querySelector("#login");

loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }

    // Disables the button after the form has been submitted already:
    loginForm.loginButton.disabled = true;

    // Time to actually process the login using the function from auth.js!
    login(loginData);
};


/* Other way to possibly do it
var form = document.getElementById("login-form");
form.onsubmit = function(event) {
  event.preventDefault();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  // Send a request to the server to check the login credentials
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        // If the login is successful, set the login status in a cookie or local storage
        if (localStorage) {
          localStorage.setItem("loggedIn", true);
        } else {
          document.cookie = "loggedIn=true; expires=Fri, 31 Dec 2025 23:59:59 GMT";
        }
        // Redirect to the protected page
        window.location.href = "posts.html";
      } else {
        // If the login is unsuccessful, display an error message
        document.getElementById("error").innerHTML = "Invalid username or password";
      }
    }
  };
  xhr.open("POST", "/login", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password));
};