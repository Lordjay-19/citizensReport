function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

function login() {
  showLoader();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      hideLoader();
      window.location = "homepage.html";
    })
    .catch((err) => {
      hideLoader();
      alert(err.message);
    });
}
