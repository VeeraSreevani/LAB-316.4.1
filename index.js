//Part 3: Registration Form Validation Requirements
//*************************************************/
const form = document.getElementById("registration");
const errorDisplay = document.getElementById("errorDisplay");
errorDisplay.innerHTML = "";
let errors = [];

const username = document.querySelector('input[name="username"]');
const email = document.querySelector('input[name="email"]');
const password = document.querySelector('input[name="password"]');
const passwordCheck = document.querySelector('input[name="passwordCheck"]');


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
    if(value === "")
      {
        errors.push(`Username cannot be blank.`);
        username.focus();
      }else if(value.length<4){
        errors.push(`Username must be at least four characters long. `);
      } else if(new Set(value).size < 2){
        errors.push(`The username must contain at least two unique characters.`);
      }else if(!regex.test(value)){
        errors.push(`The username cannot contain any special characters or whitespace.`);
        console.log(regex.test(value));
      }  
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
    // if(value.toLowerCase().includes(username.value.toLower()))
    // {
    //     errors.push("Password cannot contain your username.");
    // }

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
      errors.push("Passwords do not match.");
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

const termsCheckbox = document.querySelector('input[name="terms"]'); 

form.addEventListener('submit', function(e) {
  errors = [];
  const value = e.target.value;
  // Checking the terms checkbox is checked
  if (!termsCheckbox.checked) {
    errors.push('The terms and conditions must be accepted.');
    e.preventDefault();// Prevent form submission
  }
  if (errors.length > 0) {
    errorDisplay.innerHTML = `${errors}`; // Display errors
    errorDisplay.style.display = "block";
    errorDisplay.style.color = "red";
    
  } else {
    errorDisplay.style.display = "none";


    //Registration Form - Form Submission:
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

//Registration Form - Username Validation (Part Two):










// //************************************************* */
// // get a value into the localstorage
// localStorage.setItem("email", "user1@test.com")
// localStorage.setItem("user", "user1")

// // get a value by passing the key name
// let loggedInUser = localStorage.getItem("user");
// console.log(loggedInUser);

// // remove a value by passing the key
// localStorage.removeItem("email")

// // localStorage.clear()


// localStorage.setItem("age", 29)

// let arr = ["user99", "user88"]

// // console.log(JSON.stringify(arr))

// localStorage.setItem("players", JSON.stringify(arr))

// let players = JSON.parse(localStorage.getItem("players"));
// console.log(players[1]);



// if (localStorage.getItem("cart")) {
//     console.log(localStorage.getItem("cart"));
// } else {
//     console.log("item not found");
//     localStorage.setItem("cart", JSON.stringify(["apples", "keyboard"]))}
