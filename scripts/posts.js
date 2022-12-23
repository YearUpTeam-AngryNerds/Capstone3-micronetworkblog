/* Posts Page JavaScript */

"use strict";

window.onload = init;

function init() {
    getLoginData();
    //get the button that logs out the user and execute that functionality when clicked
    document.getElementById("logoutButton").onclick = logout;

    displayContent();
}
function displayContent() {
    // The starter function should return an object with the token propert since the user is logged in
    const bodyData = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${getLoginData().token}`
        }
    }

    fetch(`${api}/api/posts`, bodyData)
        .then(response => response.json())
        .then(allData => {
            //allData is the parent object
            const allPosts = allData.posts;
            //Access the posts property, which stores an array with ONE element, another object
            for (let post in allPosts) {
                // for each post created, add the elements it needs
                createPostStructure(post);
            }
        })
}

function createPostStructure(post) {
    // create the elements to display the post
    const postDiv = document.createElement("div");
    const usernamePara = document.createElement("p");
    const textPara = document.createElement("p");
    const datePosted = document.createElement("p");

    // Where they should fit in the HTML
    postDiv.appendChild(usernamePara);
    postDiv.appendChild(textPara);
    postDiv.appendChild(datePosted);
    // the parent DIV where all the posts are going to be nested in
    document.getElementById("displayPosts_ALLUsers").appendChild(postDiv);

    // each post has 5 properties, only showing user, text, data 
    for (let details in post) {
        switch (details) {
            case "text":
                textPara.innerHTML = post.details;
                break;
            case "username":
                usernamePara.innerHTML = post.details;
                break;
            case "createdAt":
                const date = new Date(post.details)
                datePosted.innerHTML = `${date.getMonth() + 1}/${date.getDate() + 1}/${date.getYear()} at ${date.getHours()}:${date.getMinutes()}`;
                break;
            case "likes":
                likesDropdown(postDiv, post.details);
                break;
        }
    }
}

function likesDropdown(postDiv, likesProperty) {
    const likesDropdown = document.createElement("select");
    likesDropdown.className = "form-control w-25";
    const firstOption = new Option("Liked from...", "");
    firstOption.disabled = true;
    firstOption.selected = true;
    likesDropdown.appendChild(firstOption);
    for (let x of likesProperty) {
        let likedUser = new Option(x.username, x._id);
        likesDropdown.appendChild(likedUser);
    }
    postDiv.appendChild(likesDropdown);
}