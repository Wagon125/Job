
// guest.js
// Same jobs + search + filters as jobs.js
// Apply button always redirects to reg.html

(function () {
    "use strict";
  
    const jobsList = document.getElementById("jobsList");
    const jobSearch = document.getElementById("jobSearch");
    const filterButtons = document.querySelectorAll(".filter-btn");
  
    // Copy same jobs array from jobs.js
    const jobs = [
      { title: "Frontend Developer", desc: "Work on modern web applications using React.", extra: "Remote • Full-time (Shells.plc • Abuja)", category: "Tech" },
      { title: "Barber", desc: "Must be skilled and have 2-3yrs experience", extra: "Onsite • Full-time (Enugu)", category: "Skilled Trade & Services" },
      { title: "Business Development Manager", desc: "High-end experience with business scaling", extra: "Onsite • Full-time (Powerline Gen. Lagos)", category: "Business" },
      { title: "UI/UX Designer", desc: "Design engaging user experiences and interfaces.", extra: "Onsite • Flexible (Kandor.Int • Lagos)", category: "Design" },
      { title: "Driver", desc: "At least 2-3yrs experience", extra: "Onsite • Full-time (Kano)", category: "Skilled Trade & Services" },
      // ... keep the rest of your jobs array unchanged ...
    ];
  
    function renderJobs(filteredJobs) {
      if (!jobsList) return;
      jobsList.innerHTML = "";
  
      filteredJobs.forEach((job) => {
        const card = document.createElement("div");
        card.classList.add("job-card");
  
        card.innerHTML = `
          <div>
            <h3>${job.title}</h3>
            <p>${job.desc}</p>
            <p class="extra-info">${job.extra || ""}</p>
          </div>
        `;
  
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Apply";
  
        btn.addEventListener("click", function () {
          window.location.href = "reg.html"; // redirect guests to registration
        });
  
        card.appendChild(btn);
        jobsList.appendChild(card);
      });
    }
  
    function getActiveCategory() {
      const active = Array.from(filterButtons).find((b) =>
        b.classList.contains("active")
      );
      return active ? active.textContent.trim() : "All";
    }
  
    function getFilteredJobs() {
      const searchTerm = (jobSearch && jobSearch.value ? jobSearch.value : "")
        .toLowerCase()
        .trim();
      const category = getActiveCategory();
  
      let filtered = jobs.slice();
  
      if (category && category !== "All") {
        filtered = filtered.filter((j) => j.category === category);
      }
  
      if (searchTerm) {
        filtered = filtered.filter((j) =>
          j.title.toLowerCase().includes(searchTerm)
        );
      }
  
      return filtered;
    }
  
    // Initial render
    renderJobs(jobs);
  
    // Search
    if (jobSearch) {
      jobSearch.addEventListener("input", () => {
        renderJobs(getFilteredJobs());
      });
    }
  
    // Filter buttons
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderJobs(getFilteredJobs());
      });
    });
  })();
  