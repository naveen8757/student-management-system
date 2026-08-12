// Get HTML elements

const modal =
    document.getElementById("assignmentModal");

const addAssignmentBtn =
    document.getElementById("addAssignmentBtn");

const closeModal =
    document.getElementById("closeModal");

const assignmentForm =
    document.getElementById("assignmentForm");

const assignmentGrid =
    document.getElementById("assignmentGrid");

const searchAssignment =
    document.getElementById("searchAssignment");


// Get saved assignments

let assignments =
    JSON.parse(
        localStorage.getItem("assignments")
    ) || [];


// Display assignments

displayAssignments(assignments);


// Open modal

addAssignmentBtn.addEventListener(
    "click",
    function() {

        assignmentForm.reset();

        modal.style.display = "flex";

    }
);


// Close modal

closeModal.addEventListener(
    "click",
    function() {

        modal.style.display = "none";

    }
);


// Add assignment

assignmentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const title =
            document
                .getElementById("assignmentTitle")
                .value
                .trim();


        const subject =
            document
                .getElementById("assignmentSubject")
                .value;


        const dueDate =
            document
                .getElementById("dueDate")
                .value;


        const description =
            document
                .getElementById("assignmentDescription")
                .value
                .trim();


        const assignment = {

            id: Date.now(),

            title: title,

            subject: subject,

            dueDate: dueDate,

            description: description,

            completed: false

        };


        assignments.push(assignment);


        // Save

        localStorage.setItem(
            "assignments",
            JSON.stringify(assignments)
        );


        // Display

        displayAssignments(assignments);


        // Close

        modal.style.display = "none";

        assignmentForm.reset();


        alert(
            "Assignment added successfully!"
        );

    }
);


// Display assignments

function displayAssignments(list) {

    assignmentGrid.innerHTML = "";


    if (list.length === 0) {

        assignmentGrid.innerHTML = `

            <div class="empty-message">

                <i
                    class="fa-solid fa-book-open"
                    style="font-size:40px;">
                </i>

                <br><br>

                No assignments found.

                <br>

                Click "Add Assignment" to create one.

            </div>

        `;

        return;

    }


    list.forEach(function(assignment) {

        const card =
            document.createElement("div");


        card.className =
            "assignment-card";


        if (assignment.completed) {

            card.classList.add("completed");

        }


        // Check overdue

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        if (
            assignment.dueDate < today &&
            !assignment.completed
        ) {

            card.classList.add("overdue");

        }


        const statusText =
            assignment.completed
                ? "Completed"
                : "Mark Complete";


        card.innerHTML = `

            <h3>
                ${assignment.title}
            </h3>


            <span class="subject">

                ${assignment.subject}

            </span>


            <p>
                ${assignment.description}
            </p>


            <p class="due-date">

                <i class="fa-solid fa-calendar"></i>

                Due:
                ${assignment.dueDate}

            </p>


            <p>

                <strong>
                    Status:
                </strong>

                ${
                    assignment.completed
                    ? "Completed"
                    : "Pending"
                }

            </p>


            <div class="card-actions">


                <button
                    class="complete-btn"
                    onclick="toggleComplete(${assignment.id})">

                    <i class="fa-solid fa-check"></i>

                    ${statusText}

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteAssignment(${assignment.id})">

                    <i class="fa-solid fa-trash"></i>

                    Delete

                </button>


            </div>

        `;


        assignmentGrid.appendChild(card);

    });

}


// Mark complete / pending

function toggleComplete(id) {

    const assignment =
        assignments.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!assignment) {

        return;

    }


    assignment.completed =
        !assignment.completed;


    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );


    displayAssignments(assignments);

}


// Delete assignment

function deleteAssignment(id) {

    const confirmation =
        confirm(
            "Are you sure you want to delete this assignment?"
        );


    if (!confirmation) {

        return;

    }


    assignments =
        assignments.filter(
            function(item) {

                return item.id !== id;

            }
        );


    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );


    displayAssignments(assignments);

}


// Search assignments

searchAssignment.addEventListener(
    "input",
    function() {

        const value =
            searchAssignment.value
                .toLowerCase()
                .trim();


        const filtered =
            assignments.filter(
                function(assignment) {

                    return (

                        assignment.title
                            .toLowerCase()
                            .includes(value)

                        ||

                        assignment.subject
                            .toLowerCase()
                            .includes(value)

                    );

                }
            );


        displayAssignments(filtered);

    }
);


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