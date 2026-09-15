document.addEventListener("DOMContentLoaded", function () {


  /* =========================
     MOBILE MENU
     ========================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("#nav-menu");

  if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

      if (navMenu.style.display === "flex") {

        navMenu.style.display = "none";

      } else {

        navMenu.style.display = "flex";

      }

    });

  }



  /* =========================
     LIKE BUTTON
     ========================= */

  document.querySelectorAll(".activity-post").forEach(function (post) {

    const likeButton = post.querySelector(".like-button");
    const likeCount = post.querySelector(".like-count");

    let likes = 0;

    if (likeButton) {

      likeButton.addEventListener("click", function () {

        if (likeButton.classList.contains("liked")) {

          likes--;

          likeButton.classList.remove("liked");

          likeButton.innerHTML = "♡ <span>Like</span>";

        } else {

          likes++;

          likeButton.classList.add("liked");

          likeButton.innerHTML = "♥ <span>Liked</span>";

        }

        likeCount.textContent =
          likes + (likes === 1 ? " Like" : " Likes");

      });

    }



    /* =========================
       COMMENT BUTTON
       ========================= */

    const commentButton =
      post.querySelector(".comment-button");

    const commentArea =
      post.querySelector(".comment-area");

    if (commentButton && commentArea) {

      commentButton.addEventListener("click", function () {

        commentArea.classList.toggle("show");

      });

    }



    /* =========================
       POST COMMENT
       ========================= */

    const commentInput =
      post.querySelector(".comment-input");

    const commentSubmit =
      post.querySelector(".comment-submit");

    const commentsList =
      post.querySelector(".comments-list");

    const commentCount =
      post.querySelector(".comment-count");

    let comments = 0;

    if (commentSubmit) {

      commentSubmit.addEventListener("click", function () {

        const text = commentInput.value.trim();

        if (text === "") {
          return;
        }

        const comment =
          document.createElement("div");

        comment.className = "comment-item";

        comment.textContent = text;

        commentsList.appendChild(comment);

        commentInput.value = "";

        comments++;

        commentCount.textContent =
          comments +
          (comments === 1
            ? " Comment"
            : " Comments");

      });

    }



    /* =========================
       SHARE BUTTON
       ========================= */

    const shareButton =
      post.querySelector(".share-button");

    if (shareButton) {

      shareButton.addEventListener("click", async function () {

        const shareData = {

          title:
            "TAGCODEC Consultancy Department",

          text:
            "Check out the latest activity of the TAGCODEC Consultancy Department.",

          url:
            window.location.href

        };


        if (navigator.share) {

          try {

            await navigator.share(shareData);

          } catch (error) {

            console.log("Share cancelled.");

          }

        } else {

          try {

            await navigator.clipboard.writeText(
              window.location.href
            );

            alert(
              "Activity link copied! You can now paste it on Facebook or other platforms."
            );

          } catch (error) {

            alert(
              "Copy the page URL from your browser to share this activity."
            );

          }

        }

      });

    }

  });

});
