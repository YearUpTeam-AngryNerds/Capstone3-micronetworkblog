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

function createPostElements(post) {
    // // create the elements to display the post
    // const postDiv = document.createElement("div"),
    //     usernameRow = document.createElement("div"),
    //     textPostRow = document.createElement("div"),
    //     dateANDLikesRow = document.createElement("div"),
    //     datesCol = document.createElement("div"),
    //     likesDropdownCol = document.createElement("div"),
    //     deleteAndLikeRow = document.createElement("div"),
    //     deleteButtonCol = document.createElement("div"),
    //     emptySpaceCol_1 = document.createElement("div"),
    //     emptySpaceCol_2 = document.createElement("div"),
    //     likeButtonCol = document.createElement("div"),
    //     deleteButton = document.createElement("button"),
    //     likeButton = document.createElement("button"),
    //     spanLikeBtn = document.createElement("span"),
    //     iconLikeButton = document.createElement("i"),
    //     messageForButtons = document.createElement("div"),
    //     userID = post["_id"].slice(-5, -1);


    // // Give the elements their pclasses
    // messageForButtons.classList.add("row");
    // postDiv.className = "row my-4";
    // postDiv.id = userID;

    // usernameRow.classList.add("row");
    // usernameRow.id = post["username"] + "_" + userID;

    // textPostRow.classList.add("row");
    // textPostRow.id = `textPost_${userID}`;

    // dateANDLikesRow.classList.add("row");
    // dateANDLikesRow.id = "dateAndLikes_" + userID;

    // datesCol.className = "col-6 col-md-4 p-0";
    // datesCol.id = "dateFor_" + userID;
    // likesDropdownCol.className = "col-3 ms-5";
    // likesDropdownCol.id = "likesFor_" + userID;
    // emptySpaceCol_1.className = "col";

    // deleteAndLikeRow.className = "row mt-2";
    // deleteAndLikeRow.id = `columnToDeleteAndLike_${userID}`;

    // deleteButtonCol.className = "col-3";
    // likeButtonCol.className = "col-1";
    // emptySpaceCol_2.className = "col";


    // deleteButton.className = "btn btn-danger";
    // deleteButton.type = "button";
    // // deleteButton.style.margin = "-1 em";
    // deleteButton.id = `deleteButtonFor_${userID};`;
    // deleteButton.textContent = "DELETE";

    // iconLikeButton.className = "uil uil-heart";
    // likeButton.className = "btn btn-info";
    // likeButton.type = "button";
    // likeButton.id = `likeButtonFor_${userID}`;
    // // likeButton.textContent = "LIKE";

    // // Where they should fit in the HTML
    // spanLikeBtn.appendChild(iconLikeButton);
    // likeButton.appendChild(spanLikeBtn);
    // deleteButtonCol.appendChild(deleteButton);
    // likeButtonCol.appendChild(likeButton);
    // deleteAndLikeRow.appendChild(deleteButtonCol);
    // deleteAndLikeRow.appendChild(emptySpaceCol_2);
    // deleteAndLikeRow.appendChild(likeButtonCol);

    // dateANDLikesRow.append(datesCol);
    // dateANDLikesRow.append(emptySpaceCol_1);
    // dateANDLikesRow.append(likesDropdownCol);
    // postDiv.appendChild(usernameRow);
    // postDiv.appendChild(textPostRow);
    // postDiv.appendChild(dateANDLikesRow);
    // postDiv.appendChild(deleteAndLikeRow);
    // postDiv.appendChild(messageForButtons);

    // the parent DIV where all the posts are going to be nested in
    document.getElementById("displayPosts_ALLUsers").appendChild(postDiv);

    // adding the functionality to delete ANY post 
    document.getElementById(deleteButton.id).onclick = function () {
        const deleteData = {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${loginData.token}`
            }
        }
        fetch(`${api}/api/posts/${post["_id"]}`, deleteData)
            .then(response => {
                messageForButtons.innerHTML = "DELETED";
                document.getElementById("displayPosts_ALLUsers").replaceChild(messageForButtons, postDiv);

            });
    }

    // adding the functionality to like a post
    // document.getElementById(likeButton.id).onclick = () => {

    //     const postIdObject = {
    //         postId: post["_id"]
    //     };
    //     const formData = {
    //         method: "POST",
    //         body: JSON.stringify(postIdObject),
    //         headers: {
    //             Authorization: `Bearer ${loginData.token}`,
    //             "Content-Type": "application/json"
    //         }
    //     };
    //     fetch(`${api}/api/likes`, formData)
    //         .then(response => response.json())
    //         .then(data => {
    //             // TODO- add the user to the like array of the post immediately
    //             messageForButtons.innerHTML = "LIKED!";
    //         });
    // }
    //fill the divs with the appropriate content from
    // fillContentIntoDivs(post, usernameRow, textPostRow, datesCol, likesDropdownCol);


}

// each post is an object
// function fillContentIntoDivs(post, usernameRow, textPostRow, datesCol, likesDropdownCol) {

//     for (let details in post) {

//         switch (details) {
//             case "username":
//                 usernameRow.innerHTML = post[details];
//                 break;
//             case "text":
//                 textPostRow.innerHTML = post[details];
//                 break;
//             case "createdAt":
//                 const date = new Date(post[details]);
//                 datesCol.innerHTML = `Posted ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
//                 break;
//             case "likes":
//                 likesDropdown(post, likesDropdownCol);
//         }
//     }

// }

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
    document.querySelector(".feeds").appendChild(feedPostDiv);

    likeButton.addEventListener("click", function () {
        if (likeButton.classList.contains("btn-danger")) {
            likeButton.classList.remove("btn-danger");
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
            console.log(`${api}/api/likes`)
            fetch(`${api}/api/likes`, requestBody)
            .then(response => response.json())
            .then(data => likeButton.classList.remove("btn-danger"));
        }
    });
}

