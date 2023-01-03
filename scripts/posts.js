/* Posts Page JavaScript */

"use strict";

window.onload = function () {

    //get the button that logs out the user and execute that functionality when clicked
    document.getElementById("logoutButton").onclick = logout;
    //display all posts
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
    const includeDeleteCol =  document.createElement("div");
    const deleteButton = document.createElement("button");
    

    // Give the elements their pclasses
    postDiv.classList.add("row");
    postDiv.id = post["_id"];

    usernameRow.classList.add("row");
    usernameRow.id = post["username"] + post["_id"];

    textPostRow.classList.add("row");
    textPostRow.id = `textPost${post["_id"]}`;

    dateANDLikesRow.classList.add("row");
    dateANDLikesRow.id = "dateAndLikes" + post["_id"];

    datesCol.className = "col-5 col-md-4 p-0";
    datesCol.id = "dateFor" + post["_id"];
    likesCol.className = "col ms-5";
    likesCol.id = "likesFor" + post["_id"];

    includeDeleteCol.className = "col-3";
    includeDeleteCol.id = `columnToDelete${post["_id"]}`
    deleteButton.className = "btn btn-danger my-1";
    deleteButton.type = "button";
    deleteButton.style.margin = "-1 em";
    deleteButton.id = `deleteButtonFor${post["_id"]};`

    // Where they should fit in the HTML
    includeDeleteCol.appendChild(deleteButton);
    dateANDLikesRow.append(datesCol);
    dateANDLikesRow.append(likesCol);
    postDiv.appendChild(usernameRow);
    postDiv.appendChild(textPostRow);
    postDiv.appendChild(dateANDLikesRow);
    postDiv.appendChild(includeDeleteCol);

    fillContentIntoDivs(post, usernameRow, textPostRow, datesCol, likesCol);

    // the parent DIV where all the posts are going to be nested in
    document.getElementById("displayPosts_ALLUsers").appendChild(postDiv);

    // adding the functionality to delete ANY post 
    document.getElementById(deleteButton.id).onclick = function () {
        fetch(`${api}/auth/post${post["_id"]}`, {
            method: "DELETE"
        });
    }
}

// each post is an object
function fillContentIntoDivs(post, usernameRow, textPostRow, datesCol, likesCol) {
    for (let details in post) {
        switch (details) {
            case "text":
                usernameRow.innerHTML = post.details;
                break;
            case "username":
                textPostRow.innerHTML = post.details;
                break;
            case "createdAt":
                const date = new Date(post.details);
                datesCol.innerHTML = `Posted ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}(UTC Time)`;
                break;
            case "likes":
                likesDropdown(post, likesCol);
                break;
        }
    }
}

function likesDropdown(post, likesCol) {

    const listUsersLiked = document.createElement("select");
    listUsersLiked.className = "form-control ms-5";
    const firstOption = new Option("Liked from:", "");
    firstOption.disabled = true;
    firstOption.selected = true;
    listUsersLiked.appendChild(firstOption);
    for (let user of post["likes"]) {
        let userLiked = new Option(user.username, user._id);
        listUsersLiked.appendChild(userLiked);
    }
    likesCol.appendChild(listUsersLiked);
}