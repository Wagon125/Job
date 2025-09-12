document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("regForm");
  
    const firstInput = document.getElementById("first");
    const lastInput = document.getElementById("last");
    const emailInput = document.getElementById("mail");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirm");
    const termsInput = document.getElementById("terms");
  
    const firstError = document.getElementById("firstError");
    const lastError = document.getElementById("lastError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmError = document.getElementById("confirmError");
    const termsError = document.getElementById("termsError");
  
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
  
    // ================= Validation functions =================
    function validateFirst() {
      if (firstInput.value.trim() === "") {
        firstError.textContent = "Full name is required.";
        setError(firstInput);
        return false;
      }
      firstError.textContent = "";
      setSuccess(firstInput);
      return true;
    }
  
    function validateLast() {
      if (lastInput.value.trim() === "") {
        lastError.textContent = "Username is required.";
        setError(lastInput);
        return false;
      }
      lastError.textContent = "";
      setSuccess(lastInput);
      return true;
    }
  
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
      if (passwordInput.value === "") {
        passwordError.textContent = "Password is required.";
        setError(passwordInput);
        return false;
      } else if (!passwordInput.checkValidity()) {
        passwordError.textContent = passwordInput.title;
        setError(passwordInput);
        return false;
      }
      passwordError.textContent = "";
      setSuccess(passwordInput);
      return true;
    }
  
    function validateConfirm() {
      if (confirmInput.value === "") {
        confirmError.textContent = "Please confirm your password.";
        setError(confirmInput);
        return false;
      } else if (confirmInput.value !== passwordInput.value) {
        confirmError.textContent = "Passwords do not match.";
        setError(confirmInput);
        return false;
      }
      confirmError.textContent = "";
      setSuccess(confirmInput);
      return true;
    }
  
    function validateTerms() {
      if (!termsInput.checked) {
        termsError.textContent = "You must agree to the terms.";
        return false;
      }
      termsError.textContent = "";
      return true;
    }
  
    function setError(input) {
      input.classList.add("error-border");
      input.classList.remove("success-border");
    }
  
    function setSuccess(input) {
      input.classList.add("success-border");
      input.classList.remove("error-border");
    }
  
    // ================= Live validation =================
    firstInput.addEventListener("input", validateFirst);
    lastInput.addEventListener("input", validateLast);
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", () => {
      validatePassword();
      if (confirmInput.value !== "") validateConfirm();
    });
    confirmInput.addEventListener("input", validateConfirm);
    termsInput.addEventListener("change", validateTerms);
  
    // ================= Submit handler =================
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const isValid =
        validateFirst() &
        validateLast() &
        validateEmail() &
        validatePassword() &
        validateConfirm() &
        validateTerms();
  
      if (isValid) {
        const user = {
          fullName: firstInput.value.trim(),
          username: lastInput.value.trim(),
          email: emailInput.value.trim(),
          password: passwordInput.value
        };
        localStorage.setItem("registeredUser", JSON.stringify(user));
  
        alert("Registration successful! Please log in.");
        window.location.href = "log.html";
      }
    });
  
    // ================= Replay Animation =================
    const formRight = document.querySelector(".form-right");
  
    function replayAnimation(element) {
      element.classList.remove("animate"); // remove
      void element.offsetWidth; // trigger reflow
      element.classList.add("animate"); // re-add
    }
  
    // Replay when page loads
    replayAnimation(formRight);
  
    // Replay when coming back from another page (like login)
    window.addEventListener("pageshow", () => {
      replayAnimation(formRight);
    });
  });
  