document.addEventListener("DOMContentLoaded", () => {
    // Set username and email
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

    // Progress Circle Animation
    const circle = document.getElementById("progressCircle");
    let percent = 0;
    const interval = setInterval(() => {
        if (percent >= 80) clearInterval(interval);
        else circle.textContent = ++percent + "%";
    }, 30);

    // Dark Mode
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) document.body.classList.add("dark");

    // Tabs: Active on Click but allow Settings link to work
    const tabs = document.querySelectorAll('.tab-settings .tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // Only prevent default if it's NOT the settings link
            if (!this.href.includes("settings.html")) e.preventDefault();

            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('tab-active'));

            // Add active to clicked tab
            this.classList.add('tab-active');
        });
    });
});

// Accordion Dropdown Function
function toggleDropdown(id, cardElement) {
    const dropdown = document.getElementById(id);
    const arrow = cardElement.querySelector(".arrow");

    document.querySelectorAll(".dropdown-content").forEach(d => {
        if (d !== dropdown) d.style.maxHeight = null;
    });
    document.querySelectorAll(".arrow").forEach(a => {
        if (a !== arrow) a.classList.remove("open");
    });

    if (dropdown.style.maxHeight && dropdown.style.maxHeight !== "0px") {
        dropdown.style.maxHeight = null;
        arrow.classList.remove("open");
    } else {
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
        arrow.classList.add("open");
    }
}

// Dummy apply job
function applyJob(jobTitle) {
    alert(`You applied for ${jobTitle}`);
}
