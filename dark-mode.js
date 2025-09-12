
// Ensure code runs only after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    // Apply dark mode immediately if previously toggled
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }

    // Optional: If a toggle button exists on dashboard
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            localStorage.setItem("darkMode", document.body.classList.contains("dark"));
        });
    }
});
