
const form = document.getElementById("registerForm");
const fullNameInput = document.getElementById("fullName");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");

const fullNameError = document.getElementById("fullNameError");
const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

function setError(input) {
  input.style.borderColor = "red";
}
function setSuccess(input) {
  input.style.borderColor = "green";
}

function validateFullName() {
  if (fullNameInput.value.trim() === "") {
    fullNameError.textContent = "Full name is required";
    setError(fullNameInput);
    return false;
  } else {
    fullNameError.textContent = "";
    setSuccess(fullNameInput);
    return true;
  }
}

function validateUsername() {
  if (usernameInput.value.trim() === "") {
    usernameError.textContent = "Username is required";
    setError(usernameInput);
    return false;
  } else {
    usernameError.textContent = "";
    setSuccess(usernameInput);
    return true;
  }
}

function validateEmail() {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(emailInput.value.trim())) {
    emailError.textContent = "Invalid email address";
    setError(emailInput);
    return false;
  } else {
    emailError.textContent = "";
    setSuccess(emailInput);
    return true;
  }
}

function validatePassword() {
  if (passwordInput.value.trim().length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    setError(passwordInput);
    return false;
  } else {
    passwordError.textContent = "";
    setSuccess(passwordInput);
    return true;
  }
}

function validateConfirmPassword() {
  if (confirmInput.value.trim() !== passwordInput.value.trim()) {
    confirmError.textContent = "Passwords do not match";
    setError(confirmInput);
    return false;
  } else {
    confirmError.textContent = "";
    setSuccess(confirmInput);
    return true;
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid =
    validateFullName() &
    validateUsername() &
    validateEmail() &
    validatePassword() &
    validateConfirmPassword();

  if (!isValid) return;

  const userData = {
    fullName: fullNameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((u) => u.email === userData.email)) {
    alert("Email already registered. Please login instead.");
    return;
  }

  users.push(userData);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! Please login.");
  window.location.href = "log.html";
});
