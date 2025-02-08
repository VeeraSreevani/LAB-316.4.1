
const form = document.getElementById("registration");
const errorDisplay = document.getElementById("errorDisplay");
errorDisplay.innerHTML = "";
let errors = [];


const username = document.querySelector('input[name="username"]');
const email = document.querySelector('input[name="email"]');
const password = document.querySelector('input[name="password"]');
const passwordCheck = document.querySelector('input[name="passwordCheck"]');

// Registration Form - Username Validation:
// The username cannot be blank.
// The username must be at least four characters long.
// The username must contain at least two unique characters.
// The username cannot contain any special characters or whitespace.

const regex = /^[a-zA-Z0-9]+$/;
username.addEventListener("input", function(e){
    const value = e.target.value;
    console.log("Value", e.target.value);
    let errors = [];
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

    if (errors.length>0) {
    errorDisplay.innerHTML = `${errors}`;
    errorDisplay.style.display = "block";
    errorDisplay.style.color = "black";
  } else {
    errorDisplay.style.display = "none";
  }
});


// Registration Form - Email Validation:
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
      console.log("Invalid email detected"); 
       
    } 
    //checking domain "example.com.
    if (value.includes('example.com'))
    {
      errors.push("email cannot be from example.com domain")
    }
    // Show or hide error display
  if (errors.length > 0) {
    errorDisplay.innerHTML = errors.join("<br>");
    errorDisplay.style.display = "block";
    errorDisplay.style.color = "red";
  } else {
    errorDisplay.style.display = "none";
  } 
});

// Registration Form - Password Validation:
    // Passwords must be at least 12 characters long.
    // Passwords must have at least one uppercase and one lowercase letter.
    // Passwords must contain at least one number.
    // Passwords must contain at least one special character.
    // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
    // Passwords cannot contain the username.
    // Both passwords must match.
    
password.addEventListener("input", function(e){
  const value = e.target.value;
    errors = [];
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
    if (!specialCharRegex.test(password)) 
    {
        errors.push("Password must contain at least one special character.");
    }
    // if(password.toLowerCase().includes("password"))
    // {
    //     errors.push("Password cannot contain the word 'password'.");
    // }
    // if(password.toLowerCase().includes(username.toLowerCase()))
    // {
    //     errors.push("Password cannot contain your username.");
    // }

    if (errors.length > 0) {
        errorDisplay.style.display = "block";
        errorDisplay.innerHTML = errors.join("<br>");
        errorDisplay.style.color = "red";
      } else {
        errorDisplay.style.display = "none";
      }
   });


   passwordCheck.addEventListener("input", function () {
    let errors = [];
  
    // Check if both passwords match
    if (password.value !== passwordCheck.value) {
      errors.push("Passwords do not match.");
    }
  
    if (errors.length > 0) {
      errorDisplay.style.display = "block";
      errorDisplay.innerHTML = errors.join("<br>");
    } else {
      errorDisplay.style.display = "none";
    }
  });
  
//4)Registration Form - Terms and Conditions:
// The terms and conditions must be accepted.
const termsCheckbox = document.querySelector('input[name="terms"]'); 

// .addEventListener('submit', function(e) {
//   // Check if the terms checkbox is checked
//   if (!termsCheckbox.checked) {
//     e.preventDefault(); // Prevent form submission
//     alert('You must accept the terms and conditions before submitting.');
//   }
// });












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


// const li = document.createElement("li");
// li.textContent = "The username cannot contain any special characters or whitespace.";
// ul.appendChild(li);
// username.focus();
// errorDisplay.style.display = "block";