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

        document.querySelector("#contact").value = loggedInUserData.contact
        document.querySelector("#fullname").value = loggedInUserData.fullname
        document.querySelector("#username").value = loggedInUserData.username
        document.querySelector("#password").value = loggedInUserData.password
    }
}


document.getElementById('profileEditBtn').addEventListener('click', function(e){
    const contact = document.getElementById("contact").value
    const fullname = document.getElementById("fullname").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const userData = JSON.stringify({
        "contact": contact,
        "username": username,
        "fullname": fullname,
        "password": password,
        "loggedIn": true
    })

    localStorage.setItem("userData", userData)
    localStorage.setItem("loggedInUser", username)

    swal("Update successful!", {icon: "success"}).then(()=>{
        window.location.reload()
    })
})


var fileInput = document.getElementById('photoUpload')
var fileDisplayArea = document.getElementById('profile-image')

fileInput.addEventListener('change', function(e){
    var file = fileInput.files[0];
    var imageType = /image.*/;

    if (file.type.match(imageType)) {
        var reader = new FileReader();

        reader.onload = function(e){
            fileDisplayArea.src = reader.result
            fileDisplayArea.style.width = "100%"
        }

        reader.readAsDataURL(file); 
    } 
    else {
        fileDisplayArea.innerHTML = "File not supported!"
    }
})
