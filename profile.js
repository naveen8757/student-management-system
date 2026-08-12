// Get logged-in user information

const username =
    localStorage.getItem("username") || "User";

const role =
    localStorage.getItem("role") || "Student";


// Display username

document.getElementById("profileName")
    .textContent = username;

document.getElementById("name")
    .textContent = username;


// Display role

document.getElementById("profileRole")
    .textContent = role;

document.getElementById("role")
    .textContent = role;


// Create avatar from first letter

const firstLetter =
    username.charAt(0).toUpperCase();


document.getElementById("avatar")
    .textContent = firstLetter;


// Logout

document
    .getElementById("logout")
    .addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            localStorage.removeItem("username");

            localStorage.removeItem("role");

            window.location.href =
                "index.html";

        }
    );