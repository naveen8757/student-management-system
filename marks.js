// Get students

let students =
    JSON.parse(localStorage.getItem("students")) || [];


// Get saved marks

let marksRecords =
    JSON.parse(localStorage.getItem("marksRecords")) || [];


// HTML elements

const studentSelect =
    document.getElementById("studentSelect");

const marksForm =
    document.getElementById("marksForm");

const marksTableBody =
    document.getElementById("marksTableBody");


// Load students into dropdown

function loadStudents() {

    studentSelect.innerHTML = `
        <option value="">
            -- Select Student --
        </option>
    `;


    students.forEach(function(student, index) {

        const option =
            document.createElement("option");

        option.value = index;

        option.textContent =
            student.rollNo + " - " +
            student.name;

        studentSelect.appendChild(option);

    });

}


// Get mark input

function getMarks() {

    return {

        html:
            Number(
                document.getElementById("htmlMarks").value
            ),

        css:
            Number(
                document.getElementById("cssMarks").value
            ),

        javascript:
            Number(
                document.getElementById("javascriptMarks").value
            ),

        python:
            Number(
                document.getElementById("pythonMarks").value
            ),

        database:
            Number(
                document.getElementById("databaseMarks").value
            )

    };

}


// Calculate result

function calculateResult() {

    const marks =
        getMarks();


    const total =
        marks.html +
        marks.css +
        marks.javascript +
        marks.python +
        marks.database;


    const percentage =
        (total / 500) * 100;


    let grade;


    if (percentage >= 90) {

        grade = "A+";

    }

    else if (percentage >= 80) {

        grade = "A";

    }

    else if (percentage >= 70) {

        grade = "B";

    }

    else if (percentage >= 60) {

        grade = "C";

    }

    else if (percentage >= 50) {

        grade = "D";

    }

    else {

        grade = "F";

    }


    document.getElementById("totalMarks")
        .textContent = total;


    document.getElementById("percentage")
        .textContent =
        percentage.toFixed(1) + "%";


    document.getElementById("grade")
        .textContent = grade;


    return {

        total: total,

        percentage:
            percentage.toFixed(1),

        grade: grade,

        subjects: marks

    };

}


// Automatically calculate when marks change

document.querySelectorAll(".subject input")
    .forEach(function(input) {

        input.addEventListener(
            "input",
            calculateResult
        );

    });


// Save marks

marksForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const studentIndex =
            studentSelect.value;


        if (studentIndex === "") {

            alert(
                "Please select a student."
            );

            return;

        }


        const student =
            students[studentIndex];


        const result =
            calculateResult();


        const record = {

            rollNo:
                student.rollNo,

            name:
                student.name,

            total:
                result.total,

            percentage:
                result.percentage,

            grade:
                result.grade,

            subjects:
                result.subjects

        };


        // Check if student already has marks

        const existingIndex =
            marksRecords.findIndex(
                function(item) {

                    return item.rollNo ===
                        student.rollNo;

                }
            );


        if (existingIndex !== -1) {

            marksRecords[existingIndex] =
                record;

        }

        else {

            marksRecords.push(record);

        }


        // Save

        localStorage.setItem(
            "marksRecords",
            JSON.stringify(marksRecords)
        );


        displayMarks();


        alert(
            "Marks saved successfully!"
        );


        marksForm.reset();


        document.getElementById("totalMarks")
            .textContent = "0";


        document.getElementById("percentage")
            .textContent = "0%";


        document.getElementById("grade")
            .textContent = "-";

    }
);


// Display marks

function displayMarks() {

    marksTableBody.innerHTML = "";


    if (marksRecords.length === 0) {

        marksTableBody.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center;">

                    No marks records found.

                </td>

            </tr>

        `;

        return;

    }


    marksRecords.forEach(
        function(record, index) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${record.rollNo}
                </td>

                <td>
                    ${record.name}
                </td>

                <td>
                    ${record.total} / 500
                </td>

                <td>
                    ${record.percentage}%
                </td>

                <td>
                    <strong>
                        ${record.grade}
                    </strong>
                </td>

                <td>

                    <button
                        class="delete-btn"
                        onclick="deleteMarks(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </td>

            `;


            marksTableBody.appendChild(row);

        }
    );

}


// Delete marks

function deleteMarks(index) {

    const confirmDelete =
        confirm(
            "Delete this marks record?"
        );


    if (!confirmDelete) {

        return;

    }


    marksRecords.splice(index, 1);


    localStorage.setItem(
        "marksRecords",
        JSON.stringify(marksRecords)
    );


    displayMarks();

}


// Logout

document
    .getElementById("logout")
    .addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            localStorage.removeItem(
                "username"
            );

            localStorage.removeItem(
                "role"
            );

            window.location.href =
                "index.html";

        }
    );


// Start

loadStudents();

displayMarks();