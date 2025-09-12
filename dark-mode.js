
// -------------------------
// Dark Mode Handling
// -------------------------

// Apply dark mode on page load if previously toggled
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark");
    }
  
    // Toggle dark mode if toggle button exists
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
      darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        localStorage.setItem("darkMode", document.body.classList.contains("dark"));
      });
    }
  });
  