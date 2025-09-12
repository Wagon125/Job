
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
        window.location.href = "notifications.html";
      } else if (tab.querySelector("i.fa-id-badge")) {
        window.location.href = "verification.html";
      } else if (tab.querySelector("i.fa-house")) {
        window.location.href = "dosh.html"; // dashboard page
      }
      // Profile tab stays on current page
    });
  });

  // ---------------- Auto-Highlight Active Tab ----------------
  const currentPage = window.location.pathname.split("/").pop();
  sidebarTabs.forEach(tab => {
    const icon = tab.querySelector("i");
    if ((icon.classList.contains("fa-user") && currentPage.includes("settings.html")) ||
        (icon.classList.contains("fa-lock") && currentPage.includes("password.html")) ||
        (icon.classList.contains("fa-bell") && currentPage.includes("notifications.html")) ||
        (icon.classList.contains("fa-id-badge") && currentPage.includes("verification.html")) ||
        (icon.classList.contains("fa-house") && currentPage.includes("dosh.html"))) {
      sidebarTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
    }
  });

  // ---------------- Dark Mode ----------------
  const darkToggle = document.getElementById("darkModeToggle");
  const moon = document.querySelector(".moon-icon");

  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }

  darkToggle.addEventListener("change", () => {
    const isDark = darkToggle.checked;
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("darkMode", isDark);

    if (moon) {
      moon.classList.remove("moon-spin-on", "moon-spin-off");
      void moon.offsetWidth;
      moon.classList.add(isDark ? "moon-spin-on" : "moon-spin-off");
    }
  });
});
