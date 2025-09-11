
document.addEventListener("DOMContentLoaded", () => {
  // ---------------- Sidebar Tabs ----------------
  const sidebarTabs = document.querySelectorAll(".settings-tabs .tab");

  sidebarTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // Remove active from all
      sidebarTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      // Scroll into view
      tab.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Navigation based on icon
      if (tab.querySelector("i.fa-lock")) {
        window.location.href = "password.html";
      } else if (tab.querySelector("i.fa-bell")) {
        window.location.href = "notifications.html"; // create later
      } else if (tab.querySelector("i.fa-id-badge")) {
        window.location.href = "verification.html"; // create later
      } 
      // Profile tab stays on current page, no action needed
    });
  });

  // ---------------- Dark Mode ----------------
  const darkToggle = document.getElementById("darkModeToggle");
  const moon = document.querySelector(".moon-icon");

  // Load saved dark mode
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }

  // Toggle dark mode
  darkToggle.addEventListener("change", () => {
    const isDark = darkToggle.checked;
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("darkMode", isDark);

    // Moon spin animation
    if (moon) {
      moon.classList.remove("moon-spin-on", "moon-spin-off");
      void moon.offsetWidth; // reflow to restart animation
      moon.classList.add(isDark ? "moon-spin-on" : "moon-spin-off");
    }
  });
});
