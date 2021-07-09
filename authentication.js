import firebase from "./firebase.js";
import { loginMessage } from "./login.js";

var errorObject = {};

function ValidateEmail(email) 
{
 if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}

function signUpWithEmailPassword() {
  var email = document.querySelector('.login__input_email').value;
  var password = document.querySelectorAll('.login__input_password')[1].value;
  
  let validate = ValidateEmail(email);
  if(!validate) return;

  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      errorObject = { errorCodeKey : errorCode, errorMessageKey : errorMessage}; 
    });
  // [END auth_signup_password]
}

function signInWithEmailPassword() 
{
  var email = document.querySelector('.login__input_username').value;
  var password = document.querySelector('.login__input_password').value;

  let validate = ValidateEmail(email);
  if(!validate) return;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    var user = userCredential.user;
    errorObject = {};
    loginMessage();
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    errorObject = { errorCodeKey : errorCode, errorMessageKey : errorMessage};
    loginMessage();
  });
}

function forgotPassword()
{
  const userEmail = document.querySelector('.login__input_username').value;

  let validate = ValidateEmail(userEmail);
  if(!validate) return;

  admin.auth().generatePasswordResetLink(userEmail, actionCodeSettings)
  .then((link) => {
    // Construct password reset email template, embed the link and send
    // using custom SMTP server.
    return sendCustomPasswordResetEmail(userEmail, displayName, link);
  })
  .catch((error) => {
    // Some error occurred.
  });
}

function signInWithGoogle()
{
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(googleProvider)
    .then(() => {
      window.location.assign('./dashboard');
    })
    .catch(error => {
      console.error(error);
    })
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      if ( urlParams.get('returnTo'))  {
          window.location.href =  urlParams.get('returnTo');
          console.log(user);
      } else {
          window.location.href = "./dashboard.html"
          console.log(user);
      }
  }
});

signInWithGoogleButton.addEventListener('click', signInWithGoogle);
document.getElementById('signin-button-submit').addEventListener("click", signInWithEmailPassword); //Signin
document.getElementById('signup-button-submit').addEventListener("click", signUpWithEmailPassword); //Signup
document.getElementById('login__forgot').addEventListener("click", forgotPassword);

export {errorObject};