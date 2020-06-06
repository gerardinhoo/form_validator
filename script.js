// PULL ELEMENTS OUT FROM THE DOM
const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");


// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerHTML = message;
}

// Check the validity of email
function checkEmail(input) {
  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(res.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, "Email Is Not Valid")
  }
}

// Show Success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success"
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    if(input.value.trim() === "") {
      showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} Is Required`)
    } else {
      showSuccess(input)
    }
  })
}

// Check input length
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must be at least ${min} characters`)
  } else if(input.value.length > max) {
    showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} must be less than ${max} characters`)
  } else {
    showSuccess(input)
  }
}

// Check for password match
function checkPassword(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, "Password Do Not Match")
  }
}


// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 5, 20);
  checkLength(password, 5, 10);
  checkEmail(email);
  checkPassword(password, password2);
})