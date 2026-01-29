function signup() {
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
      alert("Account created!");
      window.location = "index.html";
    })
    .catch((err) => {
      alert(err.message);
    });
}
