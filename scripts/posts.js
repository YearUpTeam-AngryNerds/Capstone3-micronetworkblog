/* Posts Page JavaScript */
"use strict";

window.onload = function () {

    //get the button that logs out the user and execute that functionality when clicked
    // document.getElementById("logoutButton").onclick = logout;
    //display all posts
    displayContent();
}
function displayContent() {
    // The starter function should return an object with the token property since the user is logged in
    const loginData = getLoginData();
    
    const bodyData = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${loginData.token}`
        }
    }

    fetch(`${api}/api/posts`, bodyData)
        .then(response => response.json())
        .then(allData => {
            //allData is the parent object
            // const allPosts = allData.posts;
            //Access the posts property, which stores an array of objects, each holding data of one post
            for (let post of allData) {
                // for each post created, add the elements it needs
                createPostElements(post);
            }
        });
}

function createPostElements(post) {
    // create the elements to display the post
    const postDiv = document.createElement("div"),
        usernameRow = document.createElement("div"),
        textPostRow = document.createElement("div"),
        dateANDLikesRow = document.createElement("div"),
        datesCol = document.createElement("div"),
        likesDropdownCol = document.createElement("div"),
        deleteAndLikeRow = document.createElement("div"),
        deleteButtonCol = document.createElement("div"),
        emptySpaceCol = document.createElement("div"),
        likeButtonCol = document.createElement("div"),
        deleteButton = document.createElement("button"),
        likeButton = document.createElement("button");


    // Give the elements their pclasses
    postDiv.classList.add("row");
    postDiv.id = post["_id"].substring(-4);

    usernameRow.classList.add("row");
    usernameRow.id = post["username"] + post["_id"].substring(-4);

    textPostRow.classList.add("row");
    textPostRow.id = `textPost${post["_id"].substring(-4)}`;

    dateANDLikesRow.classList.add("row");
    dateANDLikesRow.id = "dateAndLikes" + post["_id"].substring(-4);

    datesCol.className = "col-5 col-md-4 p-0";
    datesCol.id = "dateFor" + post["_id"].substring(-4);
    likesDropdownCol.className = "col ms-5";
    likesDropdownCol.id = "likesFor" + post["_id"].substring(-4);

    deleteAndLikeRow.className = "row my-1";
    deleteAndLikeRow.id = `columnToDelete${post["_id"].substring(-4, -1)}`;

    deleteButtonCol.className = "col-3";
    likeButtonCol.className = "col-1";
    emptySpaceCol.className = "col";


    deleteButton.className = "btn btn-danger";
    deleteButton.type = "button";
    deleteButton.style.margin = "-1 em";
    deleteButton.id = `deleteButtonFor${post["_id"]};`;
    deleteButton.textContent = "DELETE";

    likeButton.className = "btn btn-info";
    likeButton.type = "button";
    likeButton.id = `likeButtonFor${post["_id"]}`;
    likeButton.textContent = "LIKE";

    // Where they should fit in the HTML
    deleteButtonCol.appendChild(deleteButton);
    likeButtonCol.appendChild(likeButton);
    deleteAndLikeRow.appendChild(deleteButtonCol);
    deleteAndLikeRow.appendChild(emptySpaceCol);
    deleteAndLikeRow.appendChild(likeButtonCol);

    dateANDLikesRow.append(datesCol);
    dateANDLikesRow.append(likesDropdownCol);
    postDiv.appendChild(usernameRow);
    postDiv.appendChild(textPostRow);
    postDiv.appendChild(dateANDLikesRow);
    postDiv.appendChild(deleteAndLikeRow);

    fillContentIntoDivs(post, usernameRow, textPostRow, datesCol, likesDropdownCol);

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
function fillContentIntoDivs(post, usernameRow, textPostRow, datesCol, likesDropdownCol) {
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
                likesDropdown(post, likesDropdownCol);
                break;
        }
    }
}

function likesDropdown(post, likesDropdownCol) {
    // add the dropdown when the likes property is found in the post object
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
    likesDropdownCol.appendChild(listUsersLiked);
}