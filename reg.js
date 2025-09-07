
document.getElementById("registerForm").addEventListener("submit", function(e) {
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;
  
    if (password !== confirm) {
      e.preventDefault(); // stop form submission
      alert("Passwords do not match. Please try again.");
    }
  });

  document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registerForm");
    const password = document.getElementById("password");
    const confirm = document.getElementById("confirm");
    const matchMsg = document.getElementById("matchMsg");
  
    // Live check as user types
    confirm.addEventListener("input", function() {
      if (confirm.value === "") {
        matchMsg.textContent = "";
        matchMsg.className = "";
      } else if (password.value === confirm.value) {
        matchMsg.textContent = "✅ Passwords match";
        matchMsg.className = "success";
      } else {
        matchMsg.textContent = "❌ Passwords do not match";
        matchMsg.className = "error";
      }
    });
  
    // Block submission if mismatch
    form.addEventListener("submit", function(e) {
      if (password.value !== confirm.value) {
        e.preventDefault();
        matchMsg.textContent = "❌ Passwords do not match";
        matchMsg.className = "error";
      }
    });
  });
  