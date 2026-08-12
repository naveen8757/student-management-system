const loginForm =
    document.getElementById("loginForm");


const passwordInput =
    document.getElementById("password");


const togglePassword =
    document.getElementById("togglePassword");


const loginMessage =
    document.getElementById("loginMessage");


// =====================================
// PASSWORD SHOW / HIDE
// =====================================

togglePassword.addEventListener(
    "click",
    function() {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.classList.remove(
                "fa-eye"
            );

            togglePassword.classList.add(
                "fa-eye-slash"
            );

        } else {

            passwordInput.type = "password";

            togglePassword.classList.remove(
                "fa-eye-slash"
            );

            togglePassword.classList.add(
                "fa-eye"
            );

        }

    }
);


// =====================================
// LOGIN
// =====================================

loginForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const username =
            document
            .getElementById("username")
            .value
            .trim();


        const password =
            document
            .getElementById("password")
            .value;


        const role =
            document
            .getElementById("role")
            .value;


        // =================================
        // ADMIN LOGIN
        // =================================

        if (role === "Admin") {

            if (
                username === "admin" &&
                password === "admin123"
            ) {

                localStorage.setItem(
                    "username",
                    "admin"
                );

                localStorage.setItem(
                    "role",
                    "Admin"
                );


                window.location.href =
                    "admin.html";


                return;

            }


            loginMessage.textContent =
                "Invalid Admin username or password.";

            loginMessage.style.color =
                "#f87171";

            return;

        }


        // =================================
        // TEACHER LOGIN
        // =================================

        if (role === "Teacher") {

            const teachers =
                JSON.parse(
                    localStorage.getItem("teachers")
                ) || [];


            const teacher =
                teachers.find(
                    function(t) {

                        return (
                            t.username === username &&
                            t.password === password
                        );

                    }
                );


            if (!teacher) {

                loginMessage.textContent =
                    "Teacher account not found. Please contact the Admin.";

                loginMessage.style.color =
                    "#f87171";

                return;

            }


            localStorage.setItem(
                "username",
                teacher.username
            );


            localStorage.setItem(
                "role",
                "Teacher"
            );


            localStorage.setItem(
                "teacherName",
                teacher.name
            );


            window.location.href =
                "dashboard.html";


            return;

        }


        // =================================
        // STUDENT
        // =================================

        if (role === "Student") {

            localStorage.setItem(
                "username",
                username
            );


            localStorage.setItem(
                "role",
                "Student"
            );


            window.location.href =
                "dashboard.html";

        }

    }
);