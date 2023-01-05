/* Posts Page JavaScript */
"use strict";

const loginData = getLoginData();
const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${loginData.token}`
}

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
        headers: headers
    }

    fetch(`${api}/api/posts`, bodyData)
        .then(
            response =>
                response.json()
        )
        .then(allData => {
            //allData is the parent object
            // const allPosts = allData.posts;
            //Access the posts property, which stores an array of objects, each holding data of one post
            for (let post of allData) {
                // for each post created, add the elements it needs
                // createPostElements(post);
                createFeedPerPost(post);
            }
        });
}

function createFeedPerPost(post) {
    // 5 groups within one feed
    // 1st group - head
    const feedPostDiv = document.createElement("div"),
        headDiv = document.createElement("div"),
        userGeneralDiv = document.createElement("div"),
        userDetailsInfo = document.createElement("div"),
        userNameHeading = document.createElement("h3"),
        timeStampInfo = document.createElement("small"),
        editSpan = document.createElement("span"),
        iconDots = document.createElement("i"),
        date = new Date(post["createdAt"]);

    // second group - buttons
    const userButtonsDiv = document.createElement("div"),
        interactionButtons = document.createElement("div"),
        bookmarkDiv = document.createElement("div"),
        likeButton = document.createElement("button"),
        heartSpan = document.createElement("span"),
        commentSpan = document.createElement("span"),
        shareSpan = document.createElement("span"),
        bookmarkSpan = document.createElement("span"),
        heartIcon = document.createElement("i"),
        commentsIcon = document.createElement("i"),
        shareIcon = document.createElement("i"),
        bookmarkIcon = document.createElement("i");

    // third, fourth, fifth group - likes, caption, comments
    const userLikeDiv = document.createElement("div"),
        likesPara = document.createElement("p"),
        captionDiv = document.createElement("div"),
        textPara = document.createElement("p"),
        commentsDiv = document.createElement("div"),
        deleteButtonRow = document.createElement("div"),
        deleteButton = document.createElement("button"),
        messageDeleteBtn = document.createElement("p");

    // classes and other attributes assigned
    // each post has one class feed div
    feedPostDiv.className = "feed";

    //  - 1st group (head)
    headDiv.className = "head";
    userGeneralDiv.className = "user";
    userDetailsInfo.className = "info";
    editSpan.className = "edit";
    iconDots.className = "uil uil-ellipsis-h";
    userNameHeading.textContent = post["username"];
    timeStampInfo.textContent = `Posted ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;

    // second group (buttons)
    heartIcon.className = "uil uil-heart";
    commentsIcon.className = "uil uil-comment-dots";
    shareIcon.className = "uil uil-share-alt";
    bookmarkIcon.className = "uil uil-bookmark-full";
    likeButton.className = "btn";


    // third, fourth, fifth groups - (likes, caption, comments) 
    userLikeDiv.className = "liked-by";
    captionDiv.className = "caption";
    commentsDiv.className = "comments text-muted";
    commentsDiv.innerHTML = "View all comments";
    textPara.innerHTML = `  <b>${post["username"]}</b>${post["text"]}`;
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "DELETE";

    // ids
    likeButton.id = `likePost${post["_id"].slice(-4, -1)}`;
    deleteButton.id = `deletePost${post["_id"].slice(-4, -1)}`;

    // append the inner elements to :
    // 1st group (head)
    userDetailsInfo.appendChild(userNameHeading);
    userDetailsInfo.appendChild(timeStampInfo);
    editSpan.appendChild(iconDots);
    userGeneralDiv.appendChild(userDetailsInfo);
    userGeneralDiv.appendChild(editSpan);
    headDiv.appendChild(userGeneralDiv);

    // second group (buttons)
    heartSpan.appendChild(heartIcon);
    likeButton.appendChild(heartSpan);
    commentSpan.appendChild(commentsIcon);
    shareSpan.appendChild(shareIcon);
    interactionButtons.appendChild(likeButton);
    interactionButtons.appendChild(commentSpan);
    interactionButtons.appendChild(shareSpan);
    bookmarkSpan.appendChild(bookmarkIcon);
    bookmarkDiv.appendChild(bookmarkSpan);
    userButtonsDiv.appendChild(interactionButtons);
    userButtonsDiv.appendChild(bookmarkDiv);

    // third/fourth/fifth group - likes
    userLikeDiv.appendChild(likesPara);
    captionDiv.appendChild(textPara);
    deleteButtonRow.appendChild(deleteButton);
    deleteButtonRow.appendChild(messageDeleteBtn);

    // append the groups to one feed div - class feed
    feedPostDiv.appendChild(headDiv);
    feedPostDiv.appendChild(userButtonsDiv);
    feedPostDiv.appendChild(userLikeDiv);
    feedPostDiv.appendChild(captionDiv);
    feedPostDiv.appendChild(commentsDiv);
    feedPostDiv.appendChild(deleteButtonRow);

    // append the feed to main/parent
    // const parentFeeds = document.getElementById("feeds");
    const parentFeeds = document.querySelector(".feeds");
    parentFeeds.appendChild(feedPostDiv);


    // I understand that this should be outside the event listener b/c the likeId needs to be stored and only changed if another is clicked
    let likeId = "";
    likeButton.addEventListener("click", function () {
        if (likeButton.classList.contains("btn-danger")) {
            fetch(`${api}/api/likes/${likeId}`, {
                method: "DELETE",
                headers: headers
            })
                .then(response => response.json())
                .then(data => {
                    console.log(likeId);
                    likeButton.classList.remove("btn-danger");
                });

        } else {
            // make  object for the requested body
            const postIdObject = {
                postId: post["_id"]
            };
            // set up the call with the second argument to the fetch
            const requestBody = {
                method: "POST",
                body: JSON.stringify(postIdObject),
                headers: headers
            }
            fetch(`${api}/api/likes`, requestBody)
                .then(response => response.json())
                .then(data => {
                    likeId = data["_id"];
                    likeButton.classList.add("btn-danger");
                    console.log(likeId);
                });
        }
    });

    // delete the post
    deleteButton.addEventListener("click", function () {
        fetch(`${api}/api/posts/${post["_id"]}`, {
            method: "DELETE",
            headers: headers
        }).then(response => response.json())
            .then(message => {
                deleteButtonRow.innerHTML = "DELETED";
                parentFeeds.replaceChild(deleteButtonRow, feedPostDiv);
                // setTimeout(deleteButtonRow.innerHTML = "", 5000);
                // setTimeout(parentFeeds.removeChild(deleteButtonRow), 10000);
            });
    });
}

