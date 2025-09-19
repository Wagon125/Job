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

  // ---------------- PROFILE PICTURE UPLOAD ----------------
  const uploadInput = document.getElementById("uploadProfile");
  const uploadBtn = document.getElementById("uploadBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const profileImg = document.getElementById("profilePreview");
  const userKey = JSON.parse(localStorage.getItem("loggedInUser"))?.email || "guest";

  if(uploadBtn && uploadInput){
    uploadBtn.addEventListener("click", () => uploadInput.click());
  }

  if(uploadInput){
    uploadInput.addEventListener("change", () => {
      const file = uploadInput.files[0];
      if(file){
        const reader = new FileReader();
        reader.onload = function(e){
          profileImg.src = e.target.result;
          localStorage.setItem("profilePic_" + userKey, e.target.result);

          // Update dashboard image immediately if open in same tab
          const dashImg = document.getElementById("sidebarProfile");
          if(dashImg) dashImg.src = e.target.result;
        }
        reader.readAsDataURL(file);
      }
    });
  }

  if(deleteBtn){
    deleteBtn.addEventListener("click", () => {
      profileImg.src = "https://via.placeholder.com/120";
      localStorage.removeItem("profilePic_" + userKey);

      const dashImg = document.getElementById("sidebarProfile");
      if(dashImg) dashImg.src = "https://via.placeholder.com/80";
    });
  }
});
