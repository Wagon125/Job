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

// Load saved mode across pages
window.addEventListener("load", () => {
  const darkMode = localStorage.getItem("darkMode") === "true";
  if (darkMode) {
    document.body.classList.add("dark");
    if (darkToggle) darkToggle.checked = true;
  }
});

// Update dark mode on toggle
if (darkToggle) {
  darkToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkToggle.checked);
    localStorage.setItem("darkMode", darkToggle.checked);
  });
}
