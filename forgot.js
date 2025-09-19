document.addEventListener("DOMContentLoaded", () => {

    const sendLinkBtn = document.getElementById("sendLinkBtn");
    const userIdentifier = document.getElementById("userIdentifier");
  
    sendLinkBtn.addEventListener("click", () => {
      const value = userIdentifier.value.trim();
  
      if (!value) {
        alert("Please enter your registered email or phone number.");
        userIdentifier.focus();
        return;
      }
  
      // Basic email/phone format check (optional)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10,15}$/; // adjust depending on phone format
  
      if (!emailRegex.test(value) && !phoneRegex.test(value)) {
        alert("Please enter a valid email or phone number.");
        userIdentifier.focus();
        return;
      }
  
      // Simulate sending verification link
      alert(`A verification link has been sent to ${value}. Check your inbox or SMS.`);
  
      // Optionally, clear input after sending
      userIdentifier.value = "";
    });
  
  });
  