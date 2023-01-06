/* auth.js provides LOGIN-related functions */
"use strict";


//--Will be used on the profile page
var isLoggedIn = ()=>{
    var userData = localStorage.getItem("userData")
    var loggedInUser = localStorage.getItem("loggedInUser")

    if (loggedInUser === "") {
        swal("You're not logged in!", {icon: "error"}).then( ()=>{
            window.location.href = 'login.html'
        })
    }
    else{
        
        const loggedInUserData = JSON.parse(userData)

        //--Update username and fullname on profile page
        document.querySelector(".profile-name").innerText = loggedInUserData.username
        document.querySelector(".profile-realname").innerText = loggedInUserData.fullname

    }
}


