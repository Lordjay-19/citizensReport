function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

function signup() {
  showLoader();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        name: name,
        email: email,
      });
    })
    .then(() => {
      hideLoader();
      alert("Account created");
      window.location = "index.html";
    })
    .catch((err) => {
      hideLoader();
      alert(err.message);
    });
}
