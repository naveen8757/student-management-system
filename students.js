// =====================================
// ADMIN ACCESS
// =====================================

const role = localStorage.getItem("role");

if (role !== "Admin") {

    alert("Access denied. Admin only.");

    window.location.href = "dashboard.html";

}


// =====================================
// STUDENT DATA
// =====================================

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// =====================================
// ELEMENTS
// =====================================

const studentTable =
    document.getElementById("studentTable");

const studentModal =
    document.getElementById("studentModal");

const addStudentBtn =
    document.getElementById("addStudentBtn");

const closeModal =
    document.getElementById("closeModal");

const studentForm =
    document.getElementById("studentForm");

const searchStudent =
    document.getElementById("searchStudent");


// =====================================
// UPDATE COUNTS
// =====================================

function updateStudentCount() {

    document.getElementById("studentCount")
        .textContent = students.length;

    document.getElementById("activeCount")
        .textContent = students.length;

}


// =====================================
// DISPLAY STUDENTS
// =====================================

function displayStudents(studentList = students) {

    studentTable.innerHTML = "";


    if (studentList.length === 0) {

        studentTable.innerHTML = `
            <tr>
                <td colspan="7">
                    No students found.
                </td>
            </tr>
        `;

        updateStudentCount();

        return;
    }


    studentList.forEach(function(student) {

        const originalIndex =
            students.indexOf(student);


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.roll}
            </td>

            <td>
                ${student.name}
            </td>

            <td>
                ${student.username}
            </td>

            <td>
                ${student.email}
            </td>

            <td>
                ${student.department}
            </td>

            <td>
                ${student.year}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editStudent(${originalIndex})">

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteStudent(${originalIndex})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        `;


        studentTable.appendChild(row);

    });


    updateStudentCount();

}


// =====================================
// OPEN ADD STUDENT MODAL
// =====================================

addStudentBtn.addEventListener(
    "click",
    function() {

        studentForm.reset();

        document.getElementById(
            "studentDepartment"
        ).value = "Computer Science";

        studentModal.style.display = "flex";

    }
);


// =====================================
// CLOSE MODAL
// =====================================

closeModal.addEventListener(
    "click",
    function() {

        studentModal.style.display = "none";

    }
);


// =====================================
// ADD STUDENT
// =====================================

studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const roll =
            document.getElementById(
                "studentRoll"
            ).value.trim();


        const name =
            document.getElementById(
                "studentName"
            ).value.trim();


        const username =
            document.getElementById(
                "studentUsername"
            ).value.trim();


        const email =
            document.getElementById(
                "studentEmail"
            ).value.trim();


        const department =
            document.getElementById(
                "studentDepartment"
            ).value.trim();


        const year =
            document.getElementById(
                "studentYear"
            ).value;


        const password =
            document.getElementById(
                "studentPassword"
            ).value;


        // =================================
        // CHECK DUPLICATE ROLL NUMBER
        // =================================

        const existingRoll =
            students.find(function(student) {

                return student.roll.toLowerCase() ===
                    roll.toLowerCase();

            });


        if (existingRoll) {

            alert(
                "This roll number already exists."
            );

            return;

        }


        // =================================
        // CHECK DUPLICATE USERNAME
        // =================================

        const existingUsername =
            students.find(function(student) {

                return student.username.toLowerCase() ===
                    username.toLowerCase();

            });


        if (existingUsername) {

            alert(
                "This username already exists."
            );

            return;

        }


        // =================================
        // CREATE STUDENT
        // =================================

        const student = {

            roll: roll,

            name: name,

            username: username,

            email: email,

            department: department,

            year: year,

            password: password

        };


        students.push(student);


        // =================================
        // SAVE TO LOCAL STORAGE
        // =================================

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        // =================================
        // RESET FORM
        // =================================

        studentForm.reset();


        // =================================
        // CLOSE MODAL
        // =================================

        studentModal.style.display = "none";


        // =================================
        // UPDATE TABLE
        // =================================

        displayStudents();


        alert(
            "Student added successfully!"
        );

    }
);


// =====================================
// DELETE STUDENT
// =====================================

function deleteStudent(index) {

    const answer =
        confirm(
            "Are you sure you want to delete this student?"
        );


    if (!answer) {

        return;

    }


    students.splice(index, 1);


    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );


    displayStudents();


    alert(
        "Student deleted successfully!"
    );

}


// =====================================
// EDIT STUDENT
// =====================================

function editStudent(index) {

    const student = students[index];


    document.getElementById(
        "studentRoll"
    ).value = student.roll;


    document.getElementById(
        "studentName"
    ).value = student.name;


    document.getElementById(
        "studentUsername"
    ).value = student.username;


    document.getElementById(
        "studentEmail"
    ).value = student.email;


    document.getElementById(
        "studentDepartment"
    ).value = student.department;


    document.getElementById(
        "studentYear"
    ).value = student.year;


    document.getElementById(
        "studentPassword"
    ).value = student.password;


    studentModal.style.display = "flex";


    alert(
        "Edit mode is ready. For now, changes will need to be saved as a new student."
    );

}


// =====================================
// SEARCH STUDENTS
// =====================================

searchStudent.addEventListener(
    "input",
    function() {

        const search =
            searchStudent.value
                .toLowerCase()
                .trim();


        const filteredStudents =
            students.filter(function(student) {

                return (

                    student.name
                        .toLowerCase()
                        .includes(search)

                    ||

                    student.roll
                        .toLowerCase()
                        .includes(search)

                    ||

                    student.username
                        .toLowerCase()
                        .includes(search)

                );

            });


        displayStudents(filteredStudents);

    }
);


// =====================================
// BACK TO ADMIN DASHBOARD
// =====================================

document.getElementById(
    "backBtn"
).addEventListener(
    "click",
    function() {

        window.location.href =
            "admin.html";

    }
);


// =====================================
// LOGOUT
// =====================================

document.getElementById(
    "logoutBtn"
).addEventListener(
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

displayStudents();