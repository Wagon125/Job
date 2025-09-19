
// ====== HELPER ======
function getCurrentUser() {
  try { return JSON.parse(localStorage.getItem("loggedInUser")); }
  catch { return null; }
}
function getCurrentUserKey() { 
  const user = getCurrentUser(); 
  return user && user.email ? user.email : "guest"; 
}

// ====== JOB STORAGE ======
function getAppliedJobs() { return JSON.parse(localStorage.getItem("appliedJobs_" + getCurrentUserKey())) || []; }
function getSavedJobs() { return JSON.parse(localStorage.getItem("savedJobs_" + getCurrentUserKey())) || []; }
function getInterviewJobs() { return JSON.parse(localStorage.getItem("interviewJobs_" + getCurrentUserKey())) || []; }

// ====== CARD UPDATES ======
function renderDropdown(dropdownId, jobsArray, emptyMessage, label) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown) return;
  dropdown.innerHTML = "";

  if (jobsArray.length === 0) {
    const div = document.createElement("div");
    div.className = "job-item";
    div.innerHTML = `<ul><li>${emptyMessage}</li></ul>`;
    dropdown.appendChild(div);
  } else {
    const div = document.createElement("div");
    div.className = "job-item";
    const ul = document.createElement("ul");
    jobsArray.forEach(job => {
      const li = document.createElement("li");
      if(label === "Applied") li.textContent = `${job.title} - Applied on ${job.date}`;
      else if(label === "Saved") li.textContent = `${job.title} - Saved on ${job.date}`;
      else if(label === "Interview") li.textContent = `${job.title} - Interview on ${job.date}`;
      ul.appendChild(li);
    });
    div.appendChild(ul);
    dropdown.appendChild(div);
  }
}

function updateApplicationsCard() {
  const countElem = document.querySelector(".card.blue h2");
  const applied = getAppliedJobs();
  if(countElem) countElem.textContent = applied.length;
  renderDropdown("applicationsDropdown", applied, "No jobs applied yet.", "Applied");
}

function updateSavedCard() {
  const countElem = document.querySelector(".card.orange h2");
  const saved = getSavedJobs();
  if(countElem) countElem.textContent = saved.length;
  renderDropdown("savedJobsDropdown", saved, "No jobs saved yet.", "Saved");
}

function updateInterviewCard() {
  const countElem = document.querySelector(".card.purple h2");
  const interviews = getInterviewJobs();
  if(countElem) countElem.textContent = interviews.length;
  renderDropdown("interviewsDropdown", interviews, "No interviews scheduled yet.", "Interview");
}

// ====== DROPDOWN TOGGLE ======
function toggleDropdown(dropdownId, cardElem) {
  const dropdown = document.getElementById(dropdownId);
  if (!dropdown || !cardElem) return;

  const isOpen = dropdown.style.maxHeight && dropdown.style.maxHeight !== "0px";
  
  if (isOpen) dropdown.style.maxHeight = "0";
  else dropdown.style.maxHeight = dropdown.scrollHeight + "px";

  const arrow = cardElem.querySelector(".arrow");
  if (arrow) arrow.style.transform = isOpen ? "rotate(0deg)" : "rotate(180deg)";
}

// Close dropdown when clicking outside
document.addEventListener("click", e => {
  document.querySelectorAll(".dropdown-content").forEach(dd => {
    const parent = dd.closest(".dropdown");
    if (!parent.contains(e.target)) { 
      dd.style.maxHeight = "0"; 
      const arrow = parent.querySelector(".arrow");
      if (arrow) arrow.style.transform = "rotate(0deg)";
    }
  });
});

// ====== APPLY JOB ======
function applyJob(title) {
  const applied = getAppliedJobs();
  if (!applied.find(j => j.title === title)) {
    applied.push({ title, date: new Date().toLocaleDateString() });
    localStorage.setItem("appliedJobs_" + getCurrentUserKey(), JSON.stringify(applied));
    updateApplicationsCard();
    renderRecentJobs();
    alert(`Job Applied: ${title}`);
  }
}

// ====== RECENT JOBS ======
function renderRecentJobs() {
  const container = document.getElementById("recentJobsList");
  if (!container) return;
  container.innerHTML = "";

  let jobs = JSON.parse(localStorage.getItem("jobs_" + getCurrentUserKey())) || [];
  if(jobs.length === 0) {
    jobs = [
      { title: "Frontend Developer", company: "Tech Solutions", location: "Remote" },
      { title: "Data Analyst", company: "Finance Corp", location: "Chicago, IL" },
      { title: "Virtual Assistant", company: "Unicorn Ent", location: "Lagos, Nigeria" },
    ];
    localStorage.setItem("jobs_" + getCurrentUserKey(), JSON.stringify(jobs));
  }

  const appliedJobs = getAppliedJobs();

  jobs.forEach(job => {
    const div = document.createElement("div");
    div.className = "job";
    div.innerHTML = `
      <div>
        <h3>${job.title}</h3>
        <p>${job.company} • ${job.location}</p>
      </div>
      <button>${appliedJobs.find(j => j.title === job.title) ? "Applied" : "Apply"}</button>
    `;
    const btn = div.querySelector("button");
    if (appliedJobs.find(j => j.title === job.title)) btn.disabled = true;
    else btn.addEventListener("click", () => applyJob(job.title));

    container.appendChild(div);
  });
}

// ====== DOM CONTENT LOADED ======
window.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();
  if(!user){ alert("Please login."); window.location.href="log.html"; return; }

  const userKey = getCurrentUserKey();

  // ---------------- DASHBOARD SIDEBAR PROFILE ----------------
  const profileImg = document.getElementById("sidebarProfile");
  if(profileImg){
    const savedPic = localStorage.getItem("profilePic_" + userKey);
    profileImg.src = savedPic || "https://via.placeholder.com/80";

    // Live update if Settings page changes picture
    window.addEventListener("storage", (e) => {
      if(e.key === "profilePic_" + userKey){
        profileImg.src = e.newValue || "https://via.placeholder.com/80";
      }
    });
  }

  // Names
  const nameEl = document.getElementById("profileName");
  const emailEl = document.getElementById("profileEmail");
  const usernameEl = document.getElementById("username");
  if(nameEl) nameEl.textContent = user.fullName || user.username || "User";
  if(emailEl) emailEl.textContent = user.email || "";
  if(usernameEl) usernameEl.textContent = user.username || user.fullName || "User";

  updateApplicationsCard();
  updateSavedCard();
  updateInterviewCard();
  renderRecentJobs();
});
