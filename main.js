// Simple demo interactivity for feed
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("postForm");
  const postsDiv = document.getElementById("posts");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const content = document.getElementById("postContent").value.trim();
      if (!content) return;

      const postEl = document.createElement("div");
      postEl.className = "post";
      postEl.textContent = content;
      postsDiv.prepend(postEl);

      document.getElementById("postContent").value = "";
    });
  }
});
