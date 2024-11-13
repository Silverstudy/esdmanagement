// Get the username from local storage
const usernameDisplay = document.getElementById("usernameDisplay");
const logoutButton = document.getElementById("logoutButton");

// Check if the user is logged in
const username = localStorage.getItem("username");
if (username) {
  usernameDisplay.textContent = username;
} else {
  // If not logged in, redirect to login page
  window.location.href = "login.html";
}

// Logout functionality
logoutButton.addEventListener("click", function () {
  localStorage.removeItem("username");
  window.location.href = "login.html";
});

// Toggle navbar visibility on mobile (hamburger menu)
// const navbarToggle = document.querySelector(".navbar-toggle");
// const navbar = document.querySelector(".navbar");

// navbarToggle.addEventListener("click", () => {
//   navbar.classList.toggle("active");
// });
