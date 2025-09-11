document.addEventListener("DOMContentLoaded", () => {

  // Sidebar Tabs Scroll + Active
  const sidebarTabs = document.querySelectorAll(".settings-tabs .tab");
  sidebarTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      sidebarTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      tab.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  // Accordion Toggle
  document.querySelectorAll(".settings-item").forEach(item => {
    item.addEventListener("click", () => {
      const target = document.getElementById(item.dataset.target);
      item.classList.toggle("active");
      target.classList.toggle("open");
    });
  });

  // Dark Mode Toggle
  const darkToggle = document.getElementById("darkModeToggle");
  if (darkToggle) {
    // Load saved mode on page load
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) {
      document.body.classList.add("dark");
      darkToggle.checked = true;
    }

    // Listen for toggle changes
    darkToggle.addEventListener("change", () => {
      document.body.classList.toggle("dark", darkToggle.checked);
      localStorage.setItem("darkMode", darkToggle.checked);

      // Moon animation
      const moon = document.querySelector(".moon-icon");
      if (moon) {
        moon.classList.remove("animate");
        void moon.offsetWidth; // trigger reflow
        moon.classList.add("animate");
      }
    });
  }

});

const darkToggle = document.getElementById("darkModeToggle");

if (darkToggle) {
  const moon = document.querySelector(".moon-icon");

  // Load saved mode
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    document.body.classList.add("dark");
    darkToggle.checked = true;
  }

  // Toggle event
  darkToggle.addEventListener("change", () => {
    const isDark = darkToggle.checked;
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("darkMode", isDark);

    // Add spinning animation
    if (isDark) {
      moon.classList.remove("moon-spin-off");
      void moon.offsetWidth; // force reflow
      moon.classList.add("moon-spin-on");
    } else {
      moon.classList.remove("moon-spin-on");
      void moon.offsetWidth; // force reflow
      moon.classList.add("moon-spin-off");
    }
  });
}

localStorage.setItem("darkMode", darkToggle.checked);
