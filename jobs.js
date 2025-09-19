
// jobs.js (updated)
// Keeps your original jobs rendering + search + filters.
// Adds robust Apply behavior that writes to localStorage and updates UI.

(function () {
  "use strict";

  // DOM elements (script is loaded at end of body in your HTML)
  const jobsList = document.getElementById("jobsList");
  const jobSearch = document.getElementById("jobSearch");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Sample jobs data (unchanged)
  const jobs = [
    {
      title: "Frontend Developer",
      desc: "Work on modern web applications using React.",
      extra: "Remote • Full-time (Shells.plc • Abuja",
      category: "Tech",
    },
    {
      title: "Barber",
      desc: "Must be skiiied and have least 2-3yrs experience",
      extra: "Onsite • Full-time(Enugu)",
      category: "Skilled Trade & Services",
    },
    {
      title: "Business Development Manager",
      desc: "High-end experience with business scaling",
      extra: "Onsite • Full-time(Powerline Gen. Lagos)",
      category: "Business",
    },
    {
      title: "UI/UX Designer",
      desc: "Design engaging user experiences and interfaces.",
      extra: "Onsite • Flexible (Kandor.Int •Lagos)",
      category: "Design",
    },
    {
      title: "Driver",
      desc: "At least 2-3yrs experience",
      extra: "Onsite • Full-time(Kano)",
      category: "Skilled Trade & Services",
    },
    {
      title: "Career Counselor",
      desc: "At least 2yrs experience",
      extra: "Onsite • Full-time(Kaduna)",
      category: "Education",
    },
    {
      title: "Accountant",
      desc: "ICAN candidate with at least 3yrs work experience",
      extra: "Onsite • Full-time(First Bank of Nigeria. Lagos)",
      category: "Business",
    },
    {
      title: "Chef",
      desc: "Must have a culinary Certificate and skilled",
      extra: "Onsite • Full-time(Lagos)",
      category: "Skilled Trade & Services",
    },
    {
      title: "Education Consultant",
      desc: "Must be good at interactinf with people",
      extra: "Onsite • Full-time(Kaduna)",
      category: "Education",
    },
    {
      title: "Virtual Assistant",
      desc: "Help in organizing and controling the marketig space",
      extra: "Remote • Full-time (Dodge Tech.)",
      category: "Tech",
    },
    {
      title: "Dentist",
      desc: "At least 2-5yrs experience",
      extra: "Onsite • Full-time(St.Mary Hospital • Enugu)",
      category: "Health Care",
    },
    {
      title: "Full-stack developer",
      desc: "Work hand in hand with our development team",
      extra: "Onsite • Full-time (Loaded Crown Kano)",
      category: "Tech",
    },
    {
      title: "Occupational Therapist",
      desc: "At least 2-5yrs experience and must be very good with understanding people",
      extra: "Onsite • Full-time(Enugu)",
      category: "Health Care",
    },
    {
      title: "Art Director",
      desc: "At least 1yr experience",
      extra: "Onsite • Full-time(Abia)",
      category: "Health Care",
    },
    {
      title: "Vidoe Editor",
      desc: "Creating and editing marketing contents",
      extra: "Contract • (Phortharcourt)",
      category: "Design",
    },
    {
      title: "Financial Analyst",
      desc: "Finance specialtist with at least 2yrs experience",
      extra: "Onsite • Full-time(Green House MFB. Lagos)",
      category: "Business",
    },
    {
      title: "Paramedic",
      desc: "At least 2yrs experience",
      extra: "Onsite • Full-time(Gloy Hall Hospital • Anambra)",
      category: "Health Care",
    },
    {
      title: "Hotel Manager",
      desc: "Experienced in handling customer needs",
      extra: "Onsite • Full-time(Amazon Hotels. Enugu)",
      category: "Business",
    },
    {
      title: "Social Media Manger",
      desc: "Managing media and and advertising contents of the company",
      extra: "Onsite • Full-time (Abuja)",
      category: "Design",
    },
    {
      title: "Makeup Artist",
      desc: "At least 2yrs experience and must be ready to travel",
      extra: "Contract",
      category: "Skilled Trade & Sercices",
    },
    {
      title: "Marketing Executive",
      desc: "Strong Marketing sense and experience",
      extra: "Flexible •(Lagos)",
      category: "Marketing",
    },
    {
      title: "QA Engineer / Software Tester",
      desc: "Experienced in spotting errors before launching",
      extra: "Contract • (Lagos)",
      category: "Tech",
    },
    {
      title: "Hair Stylist",
      desc: "At least 2-3yrs experience and must be very creative",
      extra: "Onsite • Full-time(Abuja)",
      category: "Skilled Trade & Services",
    },
    {
      title: "Photography",
      desc: "Experirienced and must be ready to move around",
      extra: "Flexible •(Lagos)",
      category: "Desing",
    },
    {
      title: "Fashion Desinger",
      desc: "Must be very creative and consistent",
      extra: "Onsite • Full-time(Lagos)",
      category: "Skilled Trade & Services",
    },
    {
      title: "Delivery Rider",
      desc: "Must have an excellent driving skill",
      extra: "Onsite • Full-time(Bimwa Logistics • Kano)",
      category: "Skilled Trade & Services",
    },
    {
      title: "Sales Representative",
      desc: "Managing Products assessement and distribution",
      extra: "Onsite • Full-time• (Bailyes Stores •Lagos)",
      category: "Business",
    },
    {
      title: "Registerd Nurse",
      desc: "Patients and Drug  Administration",
      extra: "Onsite • Full-time (Lagos)",
      category: "Health Care",
    },
    {
      title: "Digital Marketer",
      desc: "Plan and execute online marketing campaigns.",
      extra: "Remote • Contract (Ralpsy Space • Enugu)",
      category: "Marketing",
    },
    {
      title: "Inerior Designer",
      desc: "Must be very creative and stylish",
      extra: "Contract(Enugu)",
      category: "Design",
    },
    {
      title: "Event Planner",
      desc: "Must be very organized and at least 2yrs experience",
      extra: "Contract(Anambra)",
      category: "Design",
    },
    {
      title: "Computer/Moile Phone Repairer",
      desc: "At least 3yrs experience",
      extra: "Onsite• Full-time(Kaduna)",
      category: "Busienss",
    },
    {
      title: "Online Tutor",
      desc: "Great Teaching experience",
      extra: "Onsite • Full-time(Lagos)",
      category: "Education",
    },
    {
      title: "Medical Lab-Tech",
      desc: "Laboratory",
      extra: "Onsite • Full-time(Lagos)",
      category: "Health Care",
    },
    {
      title: "3D Modeler",
      desc: "Must be very creative",
      extra: "Contract(Abuja)",
      category: "Design",
    },
    {
      title: "Backend Developer",
      desc: "Build and maintain server-side logic.",
      extra: "Hybrid • Full-time (Abuja, Lagos, Kano)",
      category: "Tech",
    },
    {
      title: "Pharmacist",
      desc: "Qualified in Drug production and a 5yrs+ experience",
      extra: "Onsite • Fulltime(Good Grace Pharmaceauticals •Lagos)",
      category: "Health Care",
    },
    {
      title: "Accountant",
      desc: "Creating and editing marketing contents",
      extra: "Contract • (Moniepoint.MFB Kano)",
      category: "Bussiness",
    },
    {
      title: "Cloud Eng.",
      desc: "Must be very familiar with backend and up to 5yrs experience",
      extra: "Remote • Full-time(Lagos)",
      category: "Tech",
    },
    {
      title: "Animator/Motion Graphics Designer",
      desc: "Strong experience in animatimations and cartoon making with a high creative ineterlect",
      extra: "Full-time • Onsite• AfroComics(Lagos)",
      category: "Design",
    },
    {
      title: "Customer Service Officer",
      desc: "Great experience and understanding of customer needs and complaints",
      extra: "Full-time • Onsite (United Bank for Africa (UBA) Lagos)",
      category: "Bussiness",
    },
    {
      title: "Cyber Securitiy Specialist",
      desc: "High level understanding of cyebr protection and at least 5yrs experience ",
      extra: "Contract •Flexible (Lagos)",
      category: "Tech",
    },
    {
      title: "Graphic Designer",
      desc: "Create visual content for brands.",
      extra: "On-site • Part-time (Soft Telecom  •Kaduna)",
      category: "Design",
    },
  ];

  // --- Utilities to read/write appliedJobs ---
  function getAppliedJobs() {
    try {
      return JSON.parse(localStorage.getItem("appliedJobs")) || [];
    } catch (e) {
      return [];
    }
  }

  function isJobApplied(title) {
    if (!title) return false;
    const list = getAppliedJobs();
    return list.some((j) => j.title === title);
  }

  // build job card and attach Apply behavior
  function renderJobs(filteredJobs) {
    if (!jobsList) return;
    jobsList.innerHTML = "";

    filteredJobs.forEach((job) => {
      const card = document.createElement("div");
      card.classList.add("job-card");

      // We create the inner HTML but keep buttons dynamic
      card.innerHTML = `
        <div>
          <h3>${job.title}</h3>
          <p>${job.desc}</p>
          <p class="extra-info">${job.extra || ""}</p>
        </div>
      `;

      const btn = document.createElement("button");
      btn.type = "button";

      // If already applied, reflect that
      if (isJobApplied(job.title)) {
        btn.textContent = "Applied";
        btn.disabled = true;
      } else {
        btn.textContent = "Apply";
        btn.disabled = false;
      }

      // Attach apply handler
      btn.addEventListener("click", function () {
        const applied = getAppliedJobs();
        if (applied.some((j) => j.title === job.title)) {
          // already applied (race-check)
          btn.textContent = "Applied";
          btn.disabled = true;
          alert(`You've already applied for ${job.title}`);
          return;
        }

        const jobObj = {
          title: job.title,
          desc: job.desc,
          extra: job.extra,
          date: new Date().toLocaleDateString(),
        };
        applied.push(jobObj);
        localStorage.setItem("appliedJobs", JSON.stringify(applied));

        // update button UI
        btn.textContent = "Applied";
        btn.disabled = true;

        // notify same-window listeners (dashboard) that applied jobs changed
        window.dispatchEvent(new Event("appliedJobsChanged"));

        // localStorage change will trigger 'storage' in other tabs
        alert(`You applied for ${job.title}`);
      });

      card.appendChild(btn);

      jobsList.appendChild(card);
    });
  }

  // --- Filtering + Search helpers ---
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

  // --- Event wiring ---
  // initial render
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

  // If appliedJobs changes in another tab, re-render so buttons show correct state
  window.addEventListener("storage", (e) => {
    if (e.key === "appliedJobs") {
      renderJobs(getFilteredJobs());
    }
  });

  // Same-window notification (we dispatch this after writing to localStorage above)
  window.addEventListener("appliedJobsChanged", () => {
    renderJobs(getFilteredJobs());
  });

  // Preserve dark mode behavior (your previous code)
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
      );
    });
  }
})();
