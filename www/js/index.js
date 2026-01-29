function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location = "homepage.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}
