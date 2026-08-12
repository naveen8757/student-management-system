// Get students from Local Storage

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// Get HTML elements

const attendanceTable =
    document.getElementById("attendanceTable");

const attendanceDate =
    document.getElementById("attendanceDate");

const totalStudents =
    document.getElementById("totalStudents");

const presentCount =
    document.getElementById("presentCount");

const absentCount =
    document.getElementById("absentCount");

const attendancePercentage =
    document.getElementById("attendancePercentage");


// Store today's date automatically

const today = new Date()
    .toISOString()
    .split("T")[0];

attendanceDate.value = today;


// Store current attendance

let attendance = {};


// Display students

function displayStudents() {

    attendanceTable.innerHTML = "";


    totalStudents.textContent =
        students.length;


    // No students available

    if (students.length === 0) {

        attendanceTable.innerHTML = `
            <tr>
                <td colspan="4"
                    style="text-align:center; padding:30px;">

                    No students found.

                    <br><br>

                    Please add students first.

                </td>
            </tr>
        `;

        updateSummary();

        return;
    }


    students.forEach(function(student, index) {

        // Default status is present

        if (!attendance[index]) {

            attendance[index] = "present";

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${student.rollNo}
            </td>


            <td>
                ${student.name}
            </td>


            <td>
                ${student.className}
            </td>


            <td>

                <div class="status-buttons">

                    <button
                        class="status-btn present
                        ${attendance[index] === "present" ? "active" : ""}"
                        onclick="setStatus(${index}, 'present')">

                        <i class="fa-solid fa-check"></i>
                        Present

                    </button>


                    <button
                        class="status-btn absent
                        ${attendance[index] === "absent" ? "active" : ""}"
                        onclick="setStatus(${index}, 'absent')">

                        <i class="fa-solid fa-xmark"></i>
                        Absent

                    </button>

                </div>

            </td>

        `;


        attendanceTable.appendChild(row);

    });


    updateSummary();

}


// Change attendance status

function setStatus(index, status) {

    attendance[index] = status;

    displayStudents();

}


// Update summary cards

function updateSummary() {

    let present = 0;

    let absent = 0;


    Object.values(attendance).forEach(function(status) {

        if (status === "present") {

            present++;

        }

        else if (status === "absent") {

            absent++;

        }

    });


    presentCount.textContent =
        present;

    absentCount.textContent =
        absent;


    if (students.length > 0) {

        const percentage =
            Math.round((present / students.length) * 100);

        attendancePercentage.textContent =
            percentage + "%";

    }

    else {

        attendancePercentage.textContent =
            "0%";

    }

}


// Save attendance

document
.getElementById("saveAttendance")
.addEventListener("click", function() {


    const date =
        attendanceDate.value;


    if (!date) {

        alert("Please select an attendance date.");

        return;

    }


    // Get previous attendance records

    let attendanceRecords =
        JSON.parse(
            localStorage.getItem("attendanceRecords")
        ) || {};


    // Save current date

    attendanceRecords[date] =
        attendance;


    localStorage.setItem(
        "attendanceRecords",
        JSON.stringify(attendanceRecords)
    );


    alert(
        "Attendance saved successfully!"
    );

});


// Change date

attendanceDate.addEventListener("change", function() {

    const date =
        attendanceDate.value;


    let attendanceRecords =
        JSON.parse(
            localStorage.getItem("attendanceRecords")
        ) || {};


    if (attendanceRecords[date]) {

        attendance =
            attendanceRecords[date];

    }

    else {

        attendance = {};

    }


    displayStudents();

});


// Logout

document
.getElementById("logout")
.addEventListener("click", function(event) {

    event.preventDefault();

    localStorage.removeItem("username");

    localStorage.removeItem("role");

    window.location.href =
        "index.html";

});


// Start

displayStudents();