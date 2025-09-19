
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (matchedUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    alert("Login successful!");
    window.location.href = "dosh.html"; // make sure your dashboard file is really called dosh.html
  } else {
    alert("Invalid email or password. Try again.");
  }
});
