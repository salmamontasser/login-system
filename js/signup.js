// variables
let userNameInput = document.querySelector('#userName')
let emailInput = document.querySelector('#email')
let passInput = document.querySelector('#password')
let btnSignup = document.querySelector('#signupBtn')
let uNameMassage = document.querySelector('#uNameMassage')
let emailMassage = document.querySelector('#emailMassage')
let requirementList = document.querySelector('.requirements li')

// console.log(userNameInput,emailInput,passInput,btnSignup,uNameMassage,emailMassage,requirements);
btnSignup.addEventListener('click', getUser)

let userList
if (localStorage.getItem("users") != null) {
    userList = JSON.parse(localStorage.getItem("users"));
} else {
    userList = [];
}
// ***************** Get User ***************
function getUser() {
    let user = {
        userName: userNameInput.value,
        email: emailInput.value,
        password: passInput.value
    }
    userList.push(user)
    localStorage.setItem('users', JSON.stringify(userList))
    clearInput()
}
// **************** clear input ***************
function clearInput() {
    userNameInput.value = ''
    emailInput.value = ''
    passInput.value = ''
}
// ******** validation functions **************
userNameInput.addEventListener('keyup', function (e) {
    nameValid(e, uNameMassage, userNameInput)
})
function nameValid(e, massage, input) {
    var currentValue = e.target, value;
    var Regex = /^[a-zA-Z]{2,8}[^ ]\D$/g
    if (Regex.test(currentValue)) {
        if (currentValue != '') {
            input.classList.add('is-valid')
            input.classList.remove("is-invalid");
            massage.classList.replace("d-none", "d-block");
            massage.innerHTML = `<p class="text-success"> valid name </P>`;
            return true;
        } else {
            massage.classList.replace("d-block", "d-none");
            input.classList.replace("is-valid", "is-invalid");
        }
    } else {
        if (currentValue === "") {
            massage.innerHTML = `You must enter at least 4 to 10 characters and u cant enter numbers`;
            input.classList.replace("is-valid", "is-invalid");
            return false;
        } else {
            if (currentValue.length > 8) {
                massage.innerHTML = ` <p class="text-danger"> You can only enter 11 characters  </p> `;
                input.classList.replace("is-valid", "is-invalid");
            } else if (currentValue.value < 2) {
                massage.innerHTML = ` <p class="text-danger"> You must enter at least 4 to 10 characters and u cant enter numbers </p> `;
            }
            return false;
        }
    }
}
// **********email valid**********
emailInput.addEventListener('keyup', function () {
    emailValidation()
})
function emailValidation() {
    // check email
    var checkEmail = userList.some(function (e) {
        return e.email.includes(emailInput.value)
    })
    var Regex = /^[\w]+@[a-zA-Z]{2,15}\.[a-zA-Z]{2.3}$/gm
    var currentValue = emailInput.value
    for (let i = 0; i < userList.length; i++) {
        if (checkEmail != true && Regex.test(currentValue) === true) {
            if (currentValue != "") {
                email.classList.add("is-valid");
                email.classList.remove("is-invalid");
                emailMassage.classList.replace("d-none", "d-block");
                emailMassage.innerHTML = `<p class="text-capitalize text-success">valid email </P>`;
                console.log("true", checkEmail, "check");
            } else {
                emailMassage.classList.replace("d-none", "d-block");
                email.classList.replace("is-valid", "is-invalid");
                console.log("invalid");
            }
        } else {
            if (currentValue == "") {
                email.classList.replace("is-valid", "is-invalid");
                emailMassage.innerHTML = `<p class="text-capitalize text-danger"> Please enter email </p>`;
            } else {
                if (checkEmail == true) {
                    emailMassage.classList.replace("d-none", "d-block");
                    emailMassage.innerHTML = `<p class="text-capitalize text-danger"> Please enter another email </p>`;
                    console.log("false");
                } else {
                    emailMassage.classList.replace("d-none", "d-block");
                    emailMassage.innerHTML = `<p class="text-lowercase"> Ex/ name@yahoo.com </p>`;
                }
            }
        }
    }
}


// ***************password valid***************
var requirements = [
    { Regex: /.{8,14}/, index: 0 },
    { Regex: /[0-9]/, index: 1 },
    { Regex: /[a-z]/, index: 2 },
    { Regex: /[^a-zA-Z0-9]/, index: 3 },
    { Regex: /[A-Z]/, index: 4 },
];

passInput.addEventListener("keyup", function (e) {
    for (let i = 0; i < requirements.length; i++) {
        const massage = document.querySelector("#passwordTipInfo");
        const isValid = requirements[i].Regex.test(e.target.value);
        console.log(isValid);
        const requirementItem = requirementList[requirements[i].index];
        console.log(requirementItem);
        if (isValid && password.value != "") {
            requirementItem.firstElementChild.className = "fa-solid fa-check me-2";
            massage.classList.replace("d-none", "d-block");
        } else {
            massage.classList.replace("d-block", "d-none");

            requirementItem.firstElementChild.className = "fa-solid fa-circle me-2";
        }
    }
});