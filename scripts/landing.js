/* Landing Page JavaScript */

"use strict";

//--Login a user
document.getElementById("submit-btn").onclick = (e) => {

    const usernameEntered = document.getElementById("username").value
    const passwordEntered = document.getElementById("password").value
    const loggedInUserData = JSON.parse(localStorage.getItem("userData"))

    if ( loggedInUserData == "" ){
        swal("You're not registered!", {icon: "error"}).then(()=>{
            window.location.href = 'registration.html'
        })
        return false
    }
    
    if ( username == "" ){
        swal("Enter a username!", {icon: "error"}).then( ()=>{
            document.getElementById("username").focus()
        })
        return false
    }

    if ( password == "" ){
        swal("Enter a password!", {icon: "error"}).then( ()=>{
            document.getElementById("password").focus()
        })
        return false
    }

    else{

        //--validate supplied username
        if ( usernameEntered === loggedInUserData.username && loggedInUserData.password === passwordEntered ) {

            //--login now
            localStorage.setItem("loggedInUser", username)

            swal("Log in successful!", {icon: "success"}).then(()=>{ 
                window.location.href = 'posts.html'
            })
        }
        else{
            swal("Wrong username or password entered!", {icon: "error"})
        }
        return false
    }
}
