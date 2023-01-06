"use strict";

document.getElementById("register").onclick = (e) => {

    const contact = document.getElementById("contact").value;
    const fullname = document.getElementById("fullname").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if ( contact == "" ){
        swal("Enter your email or phone number!", {icon: "error"}).then( ()=>{
            document.getElementById("contact").focus()
        })
        return false
    }

    if ( fullname == "" ){
        swal("Enter your fullname!", {icon: "error"}).then( ()=>{
            document.getElementById("fullname").focus()
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

    if ( password.length < 6 ){
        swal("Enter a minimum of 6 characters!", {icon: "error"}).then( ()=>{
            document.getElementById("password").focus()
        })
        return false
    }

    else{

        const userData = JSON.stringify({
            "contact": contact,
            "username": username,
            "fullname": fullname,
            "password": password,
            "loggedIn": true
        })

        localStorage.setItem("userData", userData)
        localStorage.setItem("loggedInUser", username)
        
        swal("Registration successful!", {icon: "success"}).then(()=>{
            window.location.href = 'profile.html'
        })

        return false
    }
}
