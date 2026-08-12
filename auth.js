// =====================================
// SCMS LOGIN PROTECTION
// =====================================


// Check whether user is logged in

const username =
    localStorage.getItem("username");

const role =
    localStorage.getItem("role");


// If login information doesn't exist

if (!username || !role) {

    window.location.href = "index.html";

}