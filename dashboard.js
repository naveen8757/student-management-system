const username = localStorage.getItem("username");

document.getElementById("userName").innerHTML = username;

document.getElementById("logout").onclick = function(){

localStorage.clear();

window.location.href = "index.html";

};

// =====================================
// DASHBOARD STATISTICS
// =====================================


// Get saved data

const students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


const assignments =
    JSON.parse(
        localStorage.getItem("assignments")
    ) || [];


const marks =
    JSON.parse(
        localStorage.getItem("marksRecords")
    ) || [];


const attendance =
    JSON.parse(
        localStorage.getItem("attendanceRecords")
    ) || [];


// =====================================
// STUDENT COUNT
// =====================================

const studentCount =
    document.getElementById(
        "studentCount"
    );


if (studentCount) {

    studentCount.textContent =
        students.length;

}


// =====================================
// ASSIGNMENT COUNT
// =====================================

const assignmentCount =
    document.getElementById(
        "assignmentCount"
    );


if (assignmentCount) {

    assignmentCount.textContent =
        assignments.length;

}


// =====================================
// MARKS AVERAGE
// =====================================

const averageMarks =
    document.getElementById(
        "averageMarks"
    );


if (averageMarks) {

    if (marks.length === 0) {

        averageMarks.textContent =
            "0%";

    }

    else {

        let total = 0;

        let count = 0;


        marks.forEach(function(mark) {

            // Try common mark properties

            const value =
                Number(
                    mark.marks ??
                    mark.mark ??
                    mark.score ??
                    0
                );


            if (!isNaN(value)) {

                total += value;

                count++;

            }

        });


        const average =
            count > 0
            ? Math.round(total / count)
            : 0;


        averageMarks.textContent =
            average + "%";

    }

}


// =====================================
// ATTENDANCE
// =====================================

const attendanceCount =
    document.getElementById(
        "attendanceCount"
    );


if (attendanceCount) {

    if (attendance.length === 0) {

        attendanceCount.textContent =
            "0%";

    }

    else {

        let present = 0;

        let total = 0;


        attendance.forEach(function(record) {

            /*
             * Supports:
             * "Present"
             * "Absent"
             * present: true
             */

            if (
                record.status === "Present" ||
                record.present === true
            ) {

                present++;

            }


            total++;

        });


        const percentage =
            total > 0
            ? Math.round(
                (present / total) * 100
            )
            : 0;


        attendanceCount.textContent =
            percentage + "%";

    }

}