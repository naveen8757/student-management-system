// =====================================
// ADMIN ACCESS
// =====================================

const role = localStorage.getItem("role");


if (role !== "Admin") {

    alert("Access denied. Admin only.");

    window.location.href = "dashboard.html";

}


// =====================================
// LOAD DATA
// =====================================

const students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


const teachers =
    JSON.parse(
        localStorage.getItem("teachers")
    ) || [];


// =====================================
// DISPLAY COUNTS
// =====================================

document.getElementById(
    "studentCount"
).textContent = students.length;


document.getElementById(
    "teacherCount"
).textContent = teachers.length;


// =====================================
// LOGOUT
// =====================================

document.getElementById(
    "logoutBtn"
).addEventListener(
    "click",
    function() {

        localStorage.removeItem("username");

        localStorage.removeItem("role");

        localStorage.removeItem("teacherName");

        window.location.href =
            "index.html";

    }
);