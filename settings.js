// Get saved user information

let username =
    localStorage.getItem("username") || "User";

let role =
    localStorage.getItem("role") || "Student";


// HTML elements

const usernameInput =
    document.getElementById("usernameInput");

const currentRole =
    document.getElementById("currentRole");

const themeToggle =
    document.getElementById("themeToggle");

const notificationToggle =
    document.getElementById("notificationToggle");


// Display information

usernameInput.value = username;

currentRole.textContent = role;


// Save username

document
    .getElementById("saveUsername")
    .addEventListener(
        "click",
        function() {

            const newUsername =
                usernameInput.value.trim();


            if (newUsername === "") {

                alert(
                    "Please enter a username."
                );

                return;

            }


            localStorage.setItem(
                "username",
                newUsername
            );


            alert(
                "Username updated successfully!"
            );

        }
    );


// Load theme

const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.add(
        "light-mode"
    );

    themeToggle.checked = false;

}


// Change theme

themeToggle.addEventListener(
    "change",
    function() {

        if (themeToggle.checked) {

            document.body.classList.remove(
                "light-mode"
            );

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

        else {

            document.body.classList.add(
                "light-mode"
            );

            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }
);


// Notifications

const savedNotifications =
    localStorage.getItem(
        "notifications"
    );


if (savedNotifications === "off") {

    notificationToggle.checked = false;

}


notificationToggle.addEventListener(
    "change",
    function() {

        if (notificationToggle.checked) {

            localStorage.setItem(
                "notifications",
                "on"
            );

        }

        else {

            localStorage.setItem(
                "notifications",
                "off"
            );

        }

    }
);


// Clear classroom data

document
    .getElementById("clearData")
    .addEventListener(
        "click",
        function() {

            const confirmation =
                confirm(
                    "This will delete students, attendance, marks and assignments. Continue?"
                );


            if (!confirmation) {

                return;

            }


            localStorage.removeItem(
                "students"
            );

            localStorage.removeItem(
                "attendanceRecords"
            );

            localStorage.removeItem(
                "marksRecords"
            );

            localStorage.removeItem(
                "assignments"
            );


            alert(
                "Classroom data has been cleared."
            );

        }
    );


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