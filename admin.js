// =====================================
// ADMIN ACCESS
// =====================================

const role = localStorage.getItem("role");

if (role !== "Admin") {

    alert("Access denied. Admin only.");

    window.location.href = "dashboard.html";

}


// =====================================
// ADMIN NAME
// =====================================

const adminName =
    localStorage.getItem("username") || "Admin";

document.getElementById("adminName").textContent =
    adminName;


// =====================================
// TEACHER DATA
// =====================================

let teachers =
    JSON.parse(
        localStorage.getItem("teachers")
    ) || [];


// =====================================
// ELEMENTS
// =====================================

const teacherTable =
    document.getElementById("teacherTable");

const teacherModal =
    document.getElementById("teacherModal");

const addTeacherBtn =
    document.getElementById("addTeacherBtn");

const closeModal =
    document.getElementById("closeModal");

const teacherForm =
    document.getElementById("teacherForm");


// =====================================
// DISPLAY TEACHERS
// =====================================

function displayTeachers() {

    teacherTable.innerHTML = "";

    if (teachers.length === 0) {

        teacherTable.innerHTML = `
            <tr>
                <td colspan="5">
                    No teachers added yet.
                </td>
            </tr>
        `;

        updateTeacherCount();

        return;
    }


    teachers.forEach(function(teacher, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${teacher.name}</td>

            <td>${teacher.username}</td>

            <td>${teacher.subject}</td>

            <td>${teacher.email}</td>

            <td>

                <button
                    class="delete-btn"
                    onclick="deleteTeacher(${index})">

                    <i class="fa-solid fa-trash"></i>
                    Delete

                </button>

            </td>

        `;


        teacherTable.appendChild(row);

    });


    updateTeacherCount();

}


// =====================================
// TEACHER COUNT
// =====================================

function updateTeacherCount() {

    const teacherCount =
        document.getElementById("teacherCount");

    if (teacherCount) {

        teacherCount.textContent =
            teachers.length;

    }

}


// =====================================
// ADD TEACHER BUTTON
// =====================================

addTeacherBtn.addEventListener(
    "click",
    function() {

        teacherForm.reset();

        teacherModal.style.display = "flex";

    }
);


// =====================================
// CLOSE MODAL
// =====================================

closeModal.addEventListener(
    "click",
    function() {

        teacherModal.style.display = "none";

    }
);


// =====================================
// ADD TEACHER
// =====================================

teacherForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document
            .getElementById("teacherName")
            .value
            .trim();


        const username =
            document
            .getElementById("teacherUsername")
            .value
            .trim();


        const email =
            document
            .getElementById("teacherEmail")
            .value
            .trim();


        const subject =
            document
            .getElementById("teacherSubject")
            .value
            .trim();


        const password =
            document
            .getElementById("teacherPassword")
            .value;


        // CHECK DUPLICATE USERNAME

        const existingTeacher =
            teachers.find(function(teacher) {

                return teacher.username
                    .toLowerCase() ===
                    username.toLowerCase();

            });


        if (existingTeacher) {

            alert(
                "This username already exists."
            );

            return;

        }


        // CREATE TEACHER

        const teacher = {

            name: name,

            username: username,

            email: email,

            subject: subject,

            password: password

        };


        // SAVE TEACHER

        teachers.push(teacher);


        localStorage.setItem(
            "teachers",
            JSON.stringify(teachers)
        );


        // CLOSE AND RESET

        teacherForm.reset();

        teacherModal.style.display =
            "none";


        // REFRESH TABLE

        displayTeachers();


        alert(
            "Teacher added successfully!"
        );

    }
);


// =====================================
// DELETE TEACHER
// =====================================

function deleteTeacher(index) {

    const answer =
        confirm(
            "Are you sure you want to delete this teacher?"
        );


    if (!answer) {

        return;

    }


    teachers.splice(index, 1);


    localStorage.setItem(
        "teachers",
        JSON.stringify(teachers)
    );


    displayTeachers();

}


// =====================================
// LOGOUT
// =====================================

document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "username"
            );

            localStorage.removeItem(
                "role"
            );

            localStorage.removeItem(
                "teacherName"
            );


            window.location.href =
                "index.html";

        }
    );


// =====================================
// START
// =====================================

displayTeachers();