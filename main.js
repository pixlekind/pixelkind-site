// Simple interactivity for Pixelkind Hub
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("hubBtn");
  const msg = document.getElementById("message");

  btn.addEventListener("click", () => {
    msg.textContent = "🚀 Pixelkind Hub is live and interactive!";
  });
});
