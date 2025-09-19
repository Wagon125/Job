// preload-dark.js
(function() {
    if (localStorage.getItem("darkMode") === "true") {
        document.documentElement.classList.add("dark"); // use <html> for immediate effect
    }
})();
