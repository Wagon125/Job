
document.addEventListener("DOMContentLoaded", () => {
    // Apply global dark mode
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (darkMode) document.body.classList.add("dark");
  
    // Password Change Logic
    const changeBtn = document.getElementById("changePasswordBtn");
    changeBtn.addEventListener("click", () => {
      const current = document.getElementById("currentPassword").value;
      const newPass = document.getElementById("newPassword").value;
      const confirm = document.getElementById("confirmPassword").value;
  
      const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
  
      if (!current || !newPass || !confirm) {
        alert("Please fill in all fields.");
        return;
      }
  
      if (!savedUser || savedUser.password !== current) {
        alert("Current password is incorrect.");
        return;
      }
  
      if (newPass !== confirm) {
        alert("New passwords do not match.");
        return;
      }
  
      savedUser.password = newPass;
      localStorage.setItem("registeredUser", JSON.stringify(savedUser));
      alert("Password changed successfully!");
      
      // Clear fields
      document.getElementById("currentPassword").value = "";
      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";
    });
  });
  