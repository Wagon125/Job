
document.addEventListener("DOMContentLoaded", () => {
    const darkToggle = document.getElementById("darkModeToggle");
    const moon = document.querySelector(".moon-icon");

    // Sync toggle with localStorage immediately
    if (darkToggle) {
        const darkMode = localStorage.getItem("darkMode") === "true";
        darkToggle.checked = darkMode;
    }

    // Toggle dark mode
    if (darkToggle) {
        darkToggle.addEventListener("change", () => {
            const isDark = darkToggle.checked;
            document.documentElement.classList.toggle("dark", isDark);
            localStorage.setItem("darkMode", isDark);

            if (moon) {
                moon.classList.remove("moon-spin-on", "moon-spin-off");
                void moon.offsetWidth;
                moon.classList.add(isDark ? "moon-spin-on" : "moon-spin-off");
            }
        });
    }
});
