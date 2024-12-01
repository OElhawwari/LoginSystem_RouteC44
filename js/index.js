
// Variables :

// REGEX : 
var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Register :
var registerUsername = document.getElementById('registerUsername');
var registerEmail = document.getElementById('registerEmail');
var registerPassword = document.getElementById('registerPassword');
var registerBtn = document.getElementById('registerBtn');
var statusBoxDone = document.getElementById("statusBoxDone");
var statusBoxFailed = document.getElementById("statusBoxFailed");

// Login :
var loginEmail = document.getElementById('loginEmail');
var loginPassword = document.getElementById('loginPassword');
var loginBtn = document.getElementById('loginBtn');
var loginStatusBoxFailed = document.getElementById("loginStatusBoxFailed");
var loginStatusBoxDone = document.getElementById("loginStatusBoxDone");
var loginStatus;

// Logout : 
var logoutBtn = document.getElementById('logoutBtn');




var users = [];
if (localStorage.getItem('users') == null) {
    users = []
} else {
    users = JSON.parse(localStorage.getItem('users'))
}

function clearFields() {

    registerUsername.value = '';
    registerEmail.value = '';
    registerPassword.value = '';
    loginEmail.value = '';
    loginPassword.value = '';

}

function validateInput(email, password) {
    if (!emailRegex.test(email)) {
        return false;
    }

    if (!passwordRegex.test(password)) {
        return false;
    }

    return true;
}


// Registration Process:

function isRegisterEmpty() {
    if (registerUsername.value == '' || registerEmail.value == '' || registerPassword.value == '') {
        return true;
    } else {
        return false;
    }
}

function isEmailExist() {
    for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() == registerEmail.value.toLowerCase()) {
            return true
        }
    }
}

function register() {

    if (!isRegisterEmpty()) {

        if (validateInput(registerEmail.value, registerPassword.value)) {

            var user = {
                name: registerUsername.value,
                email: registerEmail.value,
                password: registerPassword.value,
            }

            if (users.length == 0) {
                users.push(user)
                localStorage.setItem('users', JSON.stringify(users))
                statusBoxDone.classList.remove("d-none");
                setTimeout(function (e) {
                    closeAlert();
                }, 3000);
                clearFields();
                return true
            }

            if (isEmailExist() == true) {
                document.getElementById('statusFailedText').innerHTML = 'Registration failed due to: Email already exists! <br> Window will close in (3) seconds'
                statusBoxFailed.classList.remove("d-none");
                setTimeout(function (e) {
                    closeAlert();
                }, 3000);
                clearFields();
                return false;

            } else {
                users.push(user)
                localStorage.setItem('users', JSON.stringify(users))
                statusBoxDone.classList.remove("d-none");
                setTimeout(function (e) {
                    closeAlert();
                }, 3000);
                clearFields();
                return true;

            }
        } else {
            document.getElementById('statusFailedText').innerHTML = `

            <span>

                Registration failed due to: Invalid Email/Password! <br><br>
                <span class="text-danger fs-6">
                    Password Should Contain : <br>

                    • At least one lowercase letter, one uppercase letter, <br>
                    one digit and one special character (e.g., @, $, !, %, *, ?, &).
                    <br>
                    • Minimum length of 8 characters.
                </span>

                <br><br>
                Window will close in (5) seconds

            </span> `;
            statusBoxFailed.classList.remove("d-none");
            setTimeout(function (e) {
                closeAlert();
            }, 5000);
        }

    } else {
        document.getElementById('statusFailedText').innerHTML = 'Registration failed due to: Missing Information! <br> Window will close in (3) seconds'
        statusBoxFailed.classList.remove("d-none");
        setTimeout(function (e) {
            closeAlert();
        }, 3000);
        clearFields();
        return false;
    }


}
registerBtn.addEventListener('click', function (e) {
    register();
})

function closeAlert() {
    statusBoxDone.classList.add("d-none");
    statusBoxFailed.classList.add("d-none");
    loginStatusBoxFailed.classList.add("d-none");
}

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("status")) {
        closeAlert();
    }
});


// Login Process :

function isLoginEmpty() {

    if (loginEmail.value == "" || loginPassword.value == "") {
        return true
    } else {
        return false
    }
}

function login() {
    if (!isLoginEmpty()) {
        let userFound = false;

        for (var i = 0; i < users.length; i++) {
            if (loginEmail.value == users[i].email && loginPassword.value == users[i].password) {
                localStorage.setItem('sessionUsername', users[i].name);
                loginStatusBoxDone.classList.remove("d-none");
                setTimeout(function (e) {
                    closeAlert();
                }, 3000);
                loginStatus = true;
                clearFields();
                userFound = true;
                break;
            }
        }

        if (!userFound) {
            document.getElementById('loginStatusFailedText').innerHTML =
                'Login failed due to: Invalid email or password! <br> Window will close in (3) seconds';
            loginStatusBoxFailed.classList.remove("d-none");
            setTimeout(function (e) {
                closeAlert();
            }, 3000);
            loginStatus = false;
            clearFields();
        }
    } else {
        document.getElementById('loginStatusFailedText').innerHTML =
            'Login failed due to: Missing email or password! <br> Window will close in (3) seconds';
        loginStatusBoxFailed.classList.remove("d-none");
        setTimeout(function (e) {
            closeAlert();
        }, 3000);
        loginStatus = false;
        clearFields();
    }
}


loginBtn.addEventListener('click', function (e) {
    login();
    if (loginStatus) {
        setTimeout(function (e) {
            window.location.href = "home.html";
        }, 5000);
    }
})




