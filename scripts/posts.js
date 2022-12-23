/* Posts Page JavaScript */

"use strict";

window.onload = function () {

    //get the button that logs out the user and execute that functionality when clicked
    document.getElementById("logoutButton").onclick = logout;
    displayContent();
}
function displayContent() {
    // The starter function should return an object with the token property since the user is logged in
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
            //Access the posts property, which stores an array of objects, each holding data of one post
            for (let post of allPosts) {
                // for each post created, add the elements it needs
                createPostElements(post);
            }
        })
}

function createPostElements(post) {
    // create the elements to display the post
    const postDiv = document.createElement("div");
    const usernameRow = document.createElement("div");
    const textPostRow = document.createElement("div");
    const dateANDLikesRow = document.createElement("div");
    const datesCol = document.createElement("div");
    const likesCol = document.createElement("div");

    // Give the elements their proper attributes
    postDiv.classList.add("row");
    postDiv.id = post["_id"];
    usernameRow.classList.add("row");
    usernameRow.id = post["username"]+ post["_id"];
    textPostRow.classList.add("row");
    textPostRow.id = `textPost${post["_id"]}`;
    dateANDLikesRow.classList.add("row");
    dateANDLikesRow.id = "dateAndLikes" + post["_id"];
    datesCol.className = "col-5 col-md-4 p-0";
    datesCol.id = "dateFor" + post["_id"];
    likesCol.className = "col ms-5";
    likesCol.id = "likesFor" + post["_id"];

    // Where they should fit in the HTML
    dateANDLikesRow.append(datesCol);
    dateANDLikesRow.append(likesCol);
    postDiv.appendChild(usernameRow);
    postDiv.appendChild(textPostRow);
    postDiv.appendChild(dateANDLikesRow);
   
    fillContentIntoDivs(usernameRow, textPostRow, dateANDLikesRow, datesCol, likesCol);
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

function fillContentIntoDivs(){

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