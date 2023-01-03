"use strict";

window.onload = function() {
    // Check the login status
    var loggedIn = false;
    if (localStorage) {
      loggedIn = localStorage.getItem("loggedIn") === "true";
    } else {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        if (cookies[i].trim().startsWith("loggedIn=true")) {
          loggedIn = true;
          break;
        }
      }
    }
}

fetch("https://microbloglite.herokuapp.com/posts")
.then(response => response.json())
.then(posts => {
  const container = document.getElementById("posts-container");
  let html = "";
  posts.forEach(post => {
    html += `<div class="post">
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <button class="like-button">Like</button>
      <button class="comment-button">Comment</button>
      <p>Likes: ${post.likes}</p>
      <p>Comments: ${post.comments}</p>
    </div>`;
  });
  container.innerHTML = html;
});
