//Part 3: Registration Form Validation Requirements
//*************************************************/
const form = document.getElementById("registration");
const username = document.querySelector('input[name="username"]');
const email = document.querySelector('input[name="email"]');
const password = document.querySelector('input[name="password"]');
const passwordCheck = document.querySelector('input[name="passwordCheck"]');
const errorDisplay = document.getElementById("errorDisplay");
errorDisplay.innerHTML = "";
let errors = [];

// Fetch existing users from localStorage or initialize as an empty array
const users = JSON.parse(localStorage.getItem("users")) || [];


// 1)Registration Form - Username Validation:
// The username cannot be blank.
// The username must be at least four characters long.
// The username must contain at least two unique characters.
// The username cannot contain any special characters or whitespace.

const regex = /^[a-zA-Z0-9]+$/;
username.addEventListener("input", function(e){
    const value = e.target.value;
    errors = [];
    if(value === ""){
        errors.push(`Username cannot be blank.`);
        username.focus();
      }else if(value.length<4){
        errors.push(`Username must be at least four characters long. `);
      }else if(new Set(value).size < 2){
        errors.push(`The username must contain at least two unique characters.`);
      }else if(!regex.test(value)){
        errors.push(`The username cannot contain any special characters or whitespace.`);
        console.log(regex.test(value));
      }
  //Registration Form - Username Validation:  
  // Check if the username already exists (case-insensitive)
    const usernameValue = value.trim().toLowerCase();
    if (users.some(user => user.username === usernameValue)) {
        errors.push("That username is already taken.");
    }
    if (errors.length>0) {
    errorDisplay.innerHTML = `${errors}`;
    errorDisplay.style.display = "block";
    errorDisplay.style.color = "black";
  } else {
    errorDisplay.style.display = "none";
  }
});


//2) Registration Form - Email Validation:
// The email must be a valid email address.
// The email must not be from the domain "example.com."

// const email= document.getElementById("email");
email.addEventListener("input", function(e){
    const value = e.target.value;
    let errors = [];
    // console.log("Input value:", value);
    //email regex for validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if(value && !emailRegex.test(value))
    {
      errors.push("invalid email");
       
    } 
    //checking domain "example.com.
    if (value.includes('example.com'))
    {
      errors.push("email cannot be from example.com domain")
    }
    // Show or hide error display
  if (errors.length > 0) {
    errorDisplay.innerHTML = `${errors}`;
    errorDisplay.style.display = "block";
    errorDisplay.style.color = "red";
  } else {
    errorDisplay.style.display = "none";
  } 
});

//3) Registration Form - Password Validation:
    // Passwords must be at least 12 characters long.
    // Passwords must have at least one uppercase and one lowercase letter.
    // Passwords must contain at least one number.
    // Passwords must contain at least one special character.
    // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
    // Passwords cannot contain the username.
    // Both passwords must match.
     
  password.addEventListener("input", function(e){
  const value = e.target.value;
    let errors = [];
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if(value.length < 12)
    {
        errors.push("Passwords must be at least 12 characters long.");
    }
    // Passwords must have at least one uppercase and one lowercase letter.
    if(!upperCaseRegex.test(value))
    {
        errors.push("Passwords must have at least one uppercase letter");
    }
    if(!lowerCaseRegex.test(value))
    {
        errors.push("Passwords must have at least one lowercase letter");
    }
    if (!numberRegex.test(value)) {
      errors.push("Passwords must contain at least one number.");
    }
    if (!specialCharRegex.test(value)) 
    {
        errors.push("Password must contain at least one special character.");
    }
    if(value.toLowerCase().includes("password"))
    {
        errors.push("Password cannot contain the word 'password'.");
    }
    if(value.toLowerCase().includes(username.value.toLowerCase()))
    {
        errors.push("Password cannot contain your username.");
    }

    if (errors.length > 0) {
       
        errorDisplay.innerHTML = `${errors}`;
        errorDisplay.style.display = "block";
        errorDisplay.style.color = "black";
      } else {
        errorDisplay.style.display = "none";
      }
   });

//Registration Form - passwordCheck:
   passwordCheck.addEventListener("input", function () {
    let errors = [];
  
    // Check if both passwords match
    if (password.value !== passwordCheck.value) {
      errors.push("Passwords/Password Confirmation do not match.");
    }
  
    if (errors.length > 0) {
      errorDisplay.style.display = "block";
      errorDisplay.innerHTML = `${errors}`;
    } else {
      errorDisplay.style.display = "none";
    }
  });
  
// 4)Registration Form - Terms and Conditions:
// The terms and conditions must be accepted.
const terms = form.elements.terms;
form.addEventListener('submit', function(e) {
  errors = [];
  e.preventDefault();
  const termsCheckbox = document.querySelector('input[name="terms"]'); 
  const value = e.target.value;
  // Checking the terms checkbox is checked
  if (!termsCheckbox.checked) {
    errors.push('The terms and conditions must be accepted.');
    // e.preventDefault();// Prevent form submission
  }
 
  if (errors.length > 0) {
    errorDisplay.innerHTML = `${errors}`; // Display errors
    errorDisplay.style.display = "block";
    errorDisplay.style.color = "red";
    
  } else {
    // errorDisplay.style.display = "none";
      //5) Registration Form - Form Submission:
      // Store data in localStorage if everything is valid
  const usernameValue = username.value.trim().toLowerCase();
  const emailValue = email.value.trim().toLowerCase();
  const passwordValue = password.value.trim();

  // Prepare the user object
  const user = {
    username: usernameValue,
    email: emailValue,
    password: passwordValue, 
  };

  // Fetch existing users from localStorage or initialize as an empty array
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Add the new user to the array
  users.push(user);

  // Save updated users back to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Clear form fields after successful submission
  username.value = "";
  email.value = "";
  password.value = "";
  passwordCheck.value = "";
  termsCheckbox.checked = false;

  // Display success message
  alert("Registration successful!");
}
});


//*****************************************************/
//Part 4: Login Form Validation Requirements

const loginForm = document.getElementById("login");
const loginUsername = loginForm.elements.username;
const loginPassword = loginForm.elements.password;
const persistCheckbox = loginForm.elements.persist;

  //Event listener for login form submission 
loginForm.addEventListener("submit", function(e){
  e.preventDefault();
  errors = [];

//1) Login Form - Username Validation:
  //The username cannot be blank.
  // The username must exist (within localStorage). Remember that usernames are stored in all lowercase, but the username field accepts (and should not invalidate) mixed-case input.

  // Reusing the 'usernameValue' (from registration) for login validation
  let usernameValue = loginUsername.value.trim().toLowerCase();
  if(usernameValue === "")
  {
    errors.push("username cannot be blank");// Reusing the 'errors' array declared globally
  }
  else 
  {
    //checking if username exist in the local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === usernameValue);
    if(!user)
    {
      errors.push("Username not exist");
    }
  }
//2)Login Form - Password Validation:
  // The password cannot be blank.
  // The password must be correct (validate against localStorage).

  let passwordValue = loginPassword.value.trim();
  if(passwordValue === "")
  {
    errors.push("password cannot be blank");
  } else {
    // Check if password matches the one stored in localStorage
    const user = users.find(user => user.username === usernameValue);
    if (user && user.password !== passwordValue) {
      errors.push("Incorrect password.");
    }
  }
 // Display error messages if any
 if (errors.length > 0) {
  errorDisplay.innerHTML = `${errors}`; // Reusing errorDisplay element
  errorDisplay.style.display = "block";
  errorDisplay.style.color = "red";
} else {

//If all validation is successful, clear all form fields and show a success message.
// Clear form fields 
loginUsername.value = "";
loginPassword.value = "";

// Show success message
let successMessage = "Login successful!";
if (persistCheckbox.checked) {
  successMessage += " You will be kept logged in.";
}
errorDisplay.innerHTML = successMessage; // Reusing errorDisplay element for success
    errorDisplay.style.display = "block";
    errorDisplay.style.color = "green";
  }

});









// //************************************************* */
// get a value into the localstorage
// localStorage.setItem("email", "user1@test.com")
// localStorage.setItem("user", "user1")

// get a value by passing the key name
// let loggedInUser = localStorage.getItem("user");
// console.log(loggedInUser);

// remove a value by passing the key
// localStorage.removeItem("email")

// localStorage.clear()


// localStorage.setItem("age", 29)

// let arr = ["user99", "user88"]

// console.log(JSON.stringify(arr))

// localStorage.setItem("players", JSON.stringify(arr))

// let players = JSON.parse(localStorage.getItem("players"));
// console.log(players[1]);



// if (localStorage.getItem("cart")) {
//     console.log(localStorage.getItem("cart"));
// } else {
//     console.log("item not found");
//     localStorage.setItem("cart", JSON.stringify(["apples", "keyboard"]))}
