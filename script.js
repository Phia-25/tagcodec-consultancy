const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#nav-menu");

toggle.addEventListener("click", () => {
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
});

document.querySelectorAll("nav a").forEach(a => {
  a.addEventListener("click", () => {
    if (window.innerWidth <= 850) {
      nav.style.display = "none";
    }
  });
});


// LIKE BUTTON
document.querySelectorAll(".activity-post").forEach(post => {

  const likeButton = post.querySelector(".like-button");
  const likeCount = post.querySelector(".like-count");

  let likes = 0;

  likeButton.addEventListener("click", () => {

    if (likeButton.classList.contains("liked")) {

      likes--;
      likeButton.classList.remove("liked");
      likeButton.innerHTML = "♡ <span>Like</span>";

    } else {

      likes++;
      likeButton.classList.add("liked");
      likeButton.innerHTML = "♥ <span>Liked</span>";

    }

    likeCount.textContent = likes + (likes === 1 ? " Like" : " Likes");

  });


  // COMMENT BUTTON
  const commentButton = post.querySelector(".comment-button");
  const commentArea = post.querySelector(".comment-area");

  commentButton.addEventListener("click", () => {

    commentArea.classList.toggle("show");

    if (commentArea.classList.contains("show")) {
      post.querySelector(".comment-input").focus();
    }

  });


  // COMMENT SUBMIT
  const commentInput = post.querySelector(".comment-input");
  const commentSubmit = post.querySelector(".comment-submit");
  const commentsList = post.querySelector(".comments-list");

  commentSubmit.addEventListener("click", addComment);

  commentInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
      addComment();
    }

  });


  function addComment() {

    const text = commentInput.value.trim();

    if (text === "") {
      return;
    }

    const comment = document.createElement("div");

    comment.className = "comment";

    comment.innerHTML = `
      <strong>Visitor</strong>
      <p>${text}</p>
    `;

    commentsList.appendChild(comment);

    commentInput.value = "";

    const commentsCount = post.querySelector(".activity-stats span:nth-child(2)");

    const totalComments = commentsList.children.length;

    commentsCount.textContent =
      totalComments + (totalComments === 1 ? " Comment" : " Comments");

  }


  // SHARE BUTTON
  const shareButton = post.querySelector(".share-button");

  shareButton.addEventListener("click", async () => {

    const shareData = {
      title: "TAGCODEC Consultancy Department",
      text: "Check out this activity from TAGCODEC Consultancy Department.",
      url: window.location.href
    };


    if (navigator.share) {

      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Share cancelled.");
      }

    } else {

      const shareMenu = document.createElement("div");

      shareMenu.className = "share-menu";

      shareMenu.innerHTML = `
        <div class="share-title">Share this activity</div>

        <button onclick="shareFacebook()">Facebook</button>

        <button onclick="shareMessenger()">Messenger</button>

        <button onclick="shareX()">X</button>

        <button onclick="shareWhatsApp()">WhatsApp</button>

        <button onclick="copyPageLink()">Copy Link</button>

        <button onclick="closeShareMenu(this)">Cancel</button>
      `;

      shareButton.parentElement.parentElement.appendChild(shareMenu);

    }

  });

});


// FACEBOOK
function shareFacebook() {

  const url = encodeURIComponent(window.location.href);

  window.open(
    "https://www.facebook.com/sharer/sharer.php?u=" + url,
    "_blank"
  );

}


// MESSENGER
function shareMessenger() {

  const url = encodeURIComponent(window.location.href);

  window.open(
    "https://www.facebook.com/dialog/send?link=" +
    url +
    "&app_id=123456789",
    "_blank"
  );

}


// X
function shareX() {

  const url = encodeURIComponent(window.location.href);

  const text = encodeURIComponent(
    "Check out this activity from TAGCODEC Consultancy Department."
  );

  window.open(
    "https://twitter.com/intent/tweet?text=" +
    text +
    "&url=" +
    url,
    "_blank"
  );

}


// WHATSAPP
function shareWhatsApp() {

  const url = encodeURIComponent(
    "Check out this activity from TAGCODEC Consultancy Department: " +
    window.location.href
  );

  window.open(
    "https://wa.me/?text=" + url,
    "_blank"
  );

}


// COPY LINK
function copyPageLink() {

  navigator.clipboard.writeText(window.location.href);

  alert("Link copied!");

}


// CLOSE SHARE MENU
function closeShareMenu(button) {

  const menu = button.closest(".share-menu");

  if (menu) {
    menu.remove();
  }

}
