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

function generateAIDescriptionMock({ name, businessType, location }) {
  return `Meet ${name}, a passionate entrepreneur based in ${location}, running a thriving ${businessType.toLowerCase()} business. They aim to bring quality service and a strong sense of community to the street economy.`;
}

function simulateAICall(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateAIDescriptionMock(data));
    }, 1500);
  });
}

document
  .getElementById("generate-description")
  .addEventListener("click", async () => {
    const name = document.getElementById("vendor-name").value;
    const businessType = document.getElementById("vendor-type").value;
    const location = document.getElementById("vendor-location").value;

    if (!name || !businessType || !location) {
      alert("Please fill in name, business type, and location first.");
      return;
    }

    const vendorData = { name, businessType, location };

    const descriptionField = document.getElementById("description");
    descriptionField.value = "Generating description...";
    const description = await simulateAICall(vendorData);
    descriptionField.value = description;
  });

document.getElementById("vendor-form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission // Display success message

  alert("Vendor registration successful!"); // Close the modal

  document.getElementById("vendor-modal").style.display = "none";

  document.getElementById("vendor-form").reset();
});

document.addEventListener("DOMContentLoaded", function () {
  const vendorDirectoryItem = document.querySelector(
    ".sidebar-menu li:nth-child(2)"
  );
  if (vendorDirectoryItem) {
    vendorDirectoryItem.addEventListener("click", () => {
      window.location.href = "vendor-directory.html";
    });
  }
});
