document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // MOBILE MENU
  // =========================

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav-menu");

  if (toggle && nav) {

    toggle.addEventListener("click", () => {
      nav.style.display =
        nav.style.display === "flex" ? "none" : "flex";
    });

    document.querySelectorAll("nav a").forEach(a => {

      a.addEventListener("click", () => {

        if (window.innerWidth <= 850) {
          nav.style.display = "none";
        }

      });

    });

  }


  // =========================
  // ACTIVITY POSTS
  // =========================

  document.querySelectorAll(".activity-post").forEach(post => {

    const likeButton = post.querySelector(".like-button");
    const likeCount = post.querySelector(".like-count");

    const commentButton = post.querySelector(".comment-button");
    const commentArea = post.querySelector(".comment-area");

    const commentInput = post.querySelector(".comment-input");
    const commentSubmit = post.querySelector(".comment-submit");
    const commentsList = post.querySelector(".comments-list");

    const shareButton = post.querySelector(".share-button");


    // =========================
    // LIKE
    // =========================

    let likes = 0;

    if (likeButton && likeCount) {

      likeButton.addEventListener("click", () => {

        if (likeButton.classList.contains("liked")) {

          likes--;

          likeButton.classList.remove("liked");

          likeButton.innerHTML =
            "♡ <span>Like</span>";

        } else {

          likes++;

          likeButton.classList.add("liked");

          likeButton.innerHTML =
            "♥ <span>Liked</span>";

        }

        likeCount.textContent =
          likes + (likes === 1 ? " Like" : " Likes");

      });

    }


    // =========================
    // COMMENT
    // =========================

    if (commentButton && commentArea) {

      commentButton.addEventListener("click", () => {

        commentArea.classList.toggle("show");

        if (
          commentArea.classList.contains("show") &&
          commentInput
        ) {
          commentInput.focus();
        }

      });

    }


    // =========================
    // ADD COMMENT
    // =========================

    function addComment() {

      if (!commentInput || !commentsList) {
        return;
      }

      const text = commentInput.value.trim();

      if (text === "") {
        return;
      }

      const comment = document.createElement("div");

      comment.className = "comment";

      const name = document.createElement("strong");
      name.textContent = "Visitor";

      const message = document.createElement("p");
      message.textContent = text;

      comment.appendChild(name);
      comment.appendChild(message);

      commentsList.appendChild(comment);

      commentInput.value = "";


      const commentsCount =
        post.querySelector(
          ".activity-stats span:nth-child(2)"
        );

      const totalComments =
        commentsList.children.length;

      if (commentsCount) {

        commentsCount.textContent =
          totalComments +
          (totalComments === 1
            ? " Comment"
            : " Comments");

      }

    }


    if (commentSubmit) {

      commentSubmit.addEventListener(
        "click",
        addComment
      );

    }


    if (commentInput) {

      commentInput.addEventListener(
        "keypress",
        (event) => {

          if (event.key === "Enter") {
            addComment();
          }

        }
      );

    }


    // =========================
    // SHARE
    // =========================

    if (shareButton) {

      shareButton.addEventListener(
        "click",
        async () => {

          const shareData = {

            title:
              "TAGCODEC Consultancy Department",

            text:
              "Check out this activity from TAGCODEC Consultancy Department.",

            url:
              window.location.href

          };


          // Mobile / supported browsers
          if (navigator.share) {

            try {

              await navigator.share(
                shareData
              );

            } catch (error) {

              console.log(
                "Share cancelled."
              );

            }

            return;
          }


          // Desktop fallback
          const oldMenu =
            post.querySelector(".share-menu");

          if (oldMenu) {
            oldMenu.remove();
            return;
          }


          const shareMenu =
            document.createElement("div");

          shareMenu.className =
            "share-menu";


          const title =
            document.createElement("div");

          title.className =
            "share-title";

          title.textContent =
            "Share this activity";

          shareMenu.appendChild(title);


          // Facebook
          const facebook =
            document.createElement("button");

          facebook.textContent =
            "Facebook";

          facebook.onclick = () => {

            const url =
              encodeURIComponent(
                window.location.href
              );

            window.open(
              "https://www.facebook.com/sharer/sharer.php?u=" +
              url,
              "_blank"
            );

          };

          shareMenu.appendChild(facebook);


          // X
          const x =
            document.createElement("button");

          x.textContent = "X";

          x.onclick = () => {

            const url =
              encodeURIComponent(
                window.location.href
              );

            const text =
              encodeURIComponent(
                "Check out this activity from TAGCODEC Consultancy Department."
              );

            window.open(
              "https://twitter.com/intent/tweet?text=" +
              text +
              "&url=" +
              url,
              "_blank"
            );

          };

          shareMenu.appendChild(x);


          // WhatsApp
          const whatsapp =
            document.createElement("button");

          whatsapp.textContent =
            "WhatsApp";

          whatsapp.onclick = () => {

            const text =
              encodeURIComponent(
                "Check out this activity from TAGCODEC Consultancy Department: " +
                window.location.href
              );

            window.open(
              "https://wa.me/?text=" +
              text,
              "_blank"
            );

          };

          shareMenu.appendChild(whatsapp);


          // Copy Link
          const copy =
            document.createElement("button");

          copy.textContent =
            "Copy Link";

          copy.onclick = async () => {

            try {

              await navigator.clipboard.writeText(
                window.location.href
              );

              alert("Link copied!");

            } catch (error) {

              alert(
                "Unable to copy the link."
              );

            }

          };

          shareMenu.appendChild(copy);


          // Cancel
          const cancel =
            document.createElement("button");

          cancel.textContent =
            "Cancel";

          cancel.onclick = () => {
            shareMenu.remove();
          };

          shareMenu.appendChild(cancel);


          post.appendChild(shareMenu);

        }
      );

    }

  });

});
