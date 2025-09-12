
document.addEventListener("DOMContentLoaded", () => {
    // -------------------------
    // Set username and email
    // -------------------------
    const usernameSpan = document.getElementById("username");
    const profileName = document.getElementById("profileName");
    const profileEmail = document.getElementById("profileEmail");

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (savedUser && loggedInUser) {
        usernameSpan.textContent = loggedInUser;
        profileName.textContent = savedUser.username;
        profileEmail.textContent = savedUser.email;
    }

    // -------------------------
    // Progress Circle Animation
    // -------------------------
    const circle = document.getElementById("progressCircle");
    let percent = 0;
    const interval = setInterval(() => {
        if (percent >= 80) clearInterval(interval);
        else circle.textContent = ++percent + "%";
    }, 30);

    // -------------------------
    // Tabs: Active on Click
    // -------------------------
    const tabSets = document.querySelectorAll('.tab-settings, .tab-jobs, .logout');
    tabSets.forEach(set => {
        const tabs = set.querySelectorAll('.tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                // Allow navigation for links
                if (!this.href.includes("settings.html") && !this.href.includes("jobs.html") && !this.href.includes("main.html")) {
                    e.preventDefault();
                }
                tabs.forEach(t => t.classList.remove('tab-active'));
                this.classList.add('tab-active');
            });
        });
    });

    // -------------------------
    // Dark Mode: Apply on load
    // -------------------------
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    // Apply dark mode immediately if previously toggled
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark");
    }

    // Toggle dark mode if button exists
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            localStorage.setItem("darkMode", document.body.classList.contains("dark"));
        });
    }
});

// -------------------------
// Accordion Dropdown Function
// -------------------------
function toggleDropdown(id, cardElement) {
    const dropdown = document.getElementById(id);
    const arrow = cardElement.querySelector(".arrow");

    // Close other dropdowns
    document.querySelectorAll(".dropdown-content").forEach(d => {
        if (d !== dropdown) d.style.maxHeight = null;
    });
    document.querySelectorAll(".arrow").forEach(a => {
        if (a !== arrow) a.classList.remove("open");
    });

    // Toggle this dropdown
    if (dropdown.style.maxHeight && dropdown.style.maxHeight !== "0px") {
        dropdown.style.maxHeight = null;
        arrow.classList.remove("open");
    } else {
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
        arrow.classList.add("open");
    }
}

// -------------------------
// Dummy apply job
// -------------------------
function applyJob(jobTitle) {
    alert(`You applied for ${jobTitle}`);
}
