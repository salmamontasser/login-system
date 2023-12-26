let userEmail = document.querySelector('#userEmail')
let passEmail = document.querySelector('#userPassword')
let loginBtn = document.querySelector('#loginBtn')
let passIsValid;
let emailIsValid;
// ********************* data from localStorage***************************
const userData = JSON.parse(localStorage.getItem("users"));
console.log(userData);

//^^^^^^^^^^^^^^^^^^^^ check Email ^^^^^^^^^^^^^^^^^^^^^^^

userEmail.addEventListener("keyup", function (e) {
    getName(e.target.value);
    emailIsValid = userData.some(function (item) {
        console.log();
        return item.email.includes(e.target.value);

    })
})
//^^^^^^^^^^^^^^^^^^^^ check password ^^^^^^^^^^^^^^^^^^^^^^^

userPassword.addEventListener("keyup", function (e) {
    passIsValid = userData.some(function (pass) {
        return pass.password.includes(e.target.value);
    });

});

loginBtn.addEventListener("click", function () {
    checkData();
    getName();
})
function checkData() {
    if (emailIsValid === true && passIsValid === true) {
        loginBtn.setAttribute("href", "pages/home.html");
        emailMass.innerHTML = `<p class="text-capitalize text-success"> wrong email </p>`;


    } else {
        let emailMass = document.querySelector("#emailMass");
        let passMassage = document.querySelector("#passMassage");
        loginBtn.setAttribute("href", "#");

        if (emailIsValid == false) {
            emailMass.classList.replace("d-none", "d-block")
            emailMass.innerHTML = `<p class="text-capitalize text-danger"> wrong email </p>`;
        } else if (passIsValid == false) {
            passMassage.classList.replace("d-none", "d-block");
            passMassage.innerHTML = `<p class="text-capitalize text-danger"> wrong password </p>`;
            console.log("fff");
        } else {
            passMassage.innerHTML = `<p class="text-capitalize text-danger"> wrong password </p>`;
            emailMass.innerHTML = `<p class="text-capitalize text-danger"> wrong email </p>`;

        }

    }
    clearInputData();
}

function clearInputData() {
    userEmail.value = "";
    userPassword.value = "";
}


function getName(e) {
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].email === e) {
            console.log(userData[i].userName);
            localStorage.setItem("userName", userData[i].userName);
            return
        } else {
            console.log("no");
        }
    }
}