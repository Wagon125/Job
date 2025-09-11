
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  // Inputs
  const emailInput = document.getElementById("mail");
  const passwordInput = document.getElementById("password");

  // Error spans
  const emailError = document.getElementById("mailError");
  const passwordError = document.getElementById("passwordError");

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;

  // Validation functions
  function validateEmail() {
    const email = emailInput.value.trim();
    if (email === "") {
      emailError.textContent = "Email is required.";
      setError(emailInput);
      return false;
    } else if (!emailPattern.test(email)) {
      emailError.textContent = "Enter a valid email (e.g. user@example.com).";
      setError(emailInput);
      return false;
    }
    emailError.textContent = "";
    setSuccess(emailInput);
    return true;
  }

  function validatePassword() {
    if (passwordInput.value.trim() === "") {
      passwordError.textContent = "Password is required.";
      setError(passwordInput);
      return false;
    }
    passwordError.textContent = "";
    setSuccess(passwordInput);
    return true;
  }

  // Utility functions
  function setError(input) {
    input.classList.add("error-border");
    input.classList.remove("success-border");
  }

  function setSuccess(input) {
    input.classList.add("success-border");
    input.classList.remove("error-border");
  }

  // Live validation
  emailInput.addEventListener("input", validateEmail);
  passwordInput.addEventListener("input", validatePassword);

  // Form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isValid = validateEmail() & validatePassword();
    if (!isValid) return;

    // ✅ Retrieve registered user
    const registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!registeredUser) {
      alert("No registered user found. Please register first.");
      return;
    }

    // ✅ Check credentials
    if (
      emailInput.value.trim() === registeredUser.email &&
      passwordInput.value.trim() === registeredUser.password
    ) {
      // Store username for dashboard
      localStorage.setItem("loggedInUser", registeredUser.username);

      // Redirect to dashboard
      window.location.href = "dosh.html";
    } else {
      emailError.textContent = "Email or password incorrect";
      passwordError.textContent = "Email or password incorrect";
      setError(emailInput);
      setError(passwordInput);
    }
  });
});
