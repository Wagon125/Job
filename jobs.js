
// Get DOM elements
const jobsList = document.getElementById('jobsList');
const jobSearch = document.getElementById('jobSearch');

// Sample jobs data with extra info line
const jobs = [
  { 
    title: "Frontend Developer", 
    desc: "Work on modern web applications using React.", 
    extra: "Remote • Full-time (Shells.plc • Abuja", 
    category: "Tech" 
  },
  { 
    title: "UI/UX Designer", 
    desc: "Design engaging user experiences and interfaces.", 
    extra: "Onsite • Flexible (Kandor.Int •Lagos)", 
    category: "Design" 
  },
  { 
    title: "Digital Marketer", 
    desc: "Plan and execute online marketing campaigns.", 
    extra: "Remote • Contract (Ralpsy Space • Enugu)", 
    category: "Marketing" 
  },
  { 
    title: "Backend Developer", 
    desc: "Build and maintain server-side logic.", 
    extra: "Hybrid • Full-time (Abuja, Lagos, Kano)", 
    category: "Tech" 
  },
  { 
    title: "Graphic Designer", 
    desc: "Create visual content for brands.", 
    extra: "On-site • Part-time (Soft Telecom  •Kaduna)", 
    category: "Design" 
  },
];

// Function to render jobs
function renderJobs(filteredJobs) {
  jobsList.innerHTML = '';
  filteredJobs.forEach(job => {
    const card = document.createElement('div');
    card.classList.add('job-card');
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.desc}</p>
      <p class="extra-info">${job.extra || ''}</p>
      <button>Apply</button>
    `;
    jobsList.appendChild(card);
  });
}

// Initial render
renderJobs(jobs);

// Search functionality
jobSearch.addEventListener('input', () => {
  const searchTerm = jobSearch.value.toLowerCase();
  const filtered = jobs.filter(job => job.title.toLowerCase().includes(searchTerm));
  renderJobs(filtered);
});

// Filter buttons functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const category = btn.textContent;
    if (category === 'All') renderJobs(jobs);
    else renderJobs(jobs.filter(job => job.category === category));
  });
});

// ---------------- Dark Mode Handling ----------------

// Apply dark mode on page load if previously toggled
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}

// Optional: Toggle from jobs page if toggle exists
const darkModeToggle = document.getElementById("dark-mode-toggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
  });
}
