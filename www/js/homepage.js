function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location = "index.html";
  } else {
    loadPosts();
  }
});

function loadPosts() {
  showLoader();

  db.collection("incidents")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      let html = "";

      snapshot.forEach((doc) => {
        let d = doc.data();

        html += `
        <div class="card">
          <h3>${d.title}</h3>
          <b>Category:</b> ${d.category}<br>
          <p>${d.description}</p>
          <small>By ${d.author}</small><br>
          <small>${new Date(d.date).toDateString()}</small><br>
          <small>Location: ${d.lat}, ${d.lng}</small>
        </div>
      `;
      });

      document.getElementById("posts").innerHTML = html;
      hideLoader();
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

        html += `
        <div class="card">
          <h3>${d.title}</h3>
          <b>Category:</b> ${d.category}<br>
          <p>${d.description}</p>
        </div>
      `;
      });

      document.getElementById("posts").innerHTML = html;
    });
}

function logout() {
  auth.signOut();
}

function filterCategory(cat) {
  if (cat == "") {
    loadPosts();
    return;
  }

  db.collection("incidents")
    .where("category", "==", cat)
    .get()
    .then((snapshot) => {
      let html = "";

      snapshot.forEach((doc) => {
        let d = doc.data();

        html += `
        <div class="card">
          <h3>${d.title}</h3>
          <b>Category:</b> ${d.category}<br>
          <p>${d.description}</p>
        </div>
      `;
      });

      document.getElementById("posts").innerHTML = html;
    });
}
