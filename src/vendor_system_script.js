document.addEventListener("DOMContentLoaded", () => {
  const registerBtn = document.querySelector(".register-btn");
  const modal = document.getElementById("vendor-modal");
  const closeBtn = document.querySelector(".close-btn");

  registerBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
