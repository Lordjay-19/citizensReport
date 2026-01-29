auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location = "index.html";
  } else {
    loadPosts();
  }
});

function loadPosts() {
  db.collection("incidents")
    .orderBy("date", "desc")
    .onSnapshot((snapshot) => {
      let html = "";
      snapshot.forEach((doc) => {
        let d = doc.data();
        html += `
        <div class="card">
          <h3>${d.title}</h3>
          <p>${d.description}</p>
          <small>By ${d.author}</small><br>
          <small>${new Date(d.date).toDateString()}</small>
        </div>
      `;
      });
      document.getElementById("posts").innerHTML = html;
    });
}

function loadMyPosts() {
  let uid = auth.currentUser.uid;
  db.collection("incidents")
    .where("uid", "==", uid)
    .get()
    .then((snapshot) => {
      let html = "";
      snapshot.forEach((doc) => {
        let d = doc.data();
        html += `<div class="card">
      <h3>${d.title}</h3>
      <p>${d.description}</p>
      </div>`;
      });
      document.getElementById("posts").innerHTML = html;
    });
}

function logout() {
  auth.signOut();
}
