function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

let imageData = "";
let latitude = "";
let longitude = "";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log("Device Ready");
}

function takePhoto() {
  if (!navigator.camera) {
    alert("Camera not ready. Run app on phone/emulator.");
    return;
  }

  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
  });
}

function onSuccess(image) {
  imageData = "data:image/jpeg;base64," + image;
  document.getElementById("preview").src = imageData;
}

function onFail(msg) {
  alert("Camera failed: " + msg);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(function (pos) {
    latitude = pos.coords.latitude;
    longitude = pos.coords.longitude;
    alert("Location saved");
  });
}

function submitIncident() {
  showLoader();

  let title = document.getElementById("title").value;
  let desc = document.getElementById("desc").value;
  let category = document.getElementById("category").value;
  let user = auth.currentUser;

  if (title == "" || desc == "" || category == "") {
    alert("All fields required");
    return;
  }

  db.collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      return db.collection("incidents").add({
        title: title,
        description: desc,
        category: category,
        image: imageData,
        lat: latitude,
        lng: longitude,
        uid: user.uid,
        author: doc.data().name,
        date: Date.now(),
      });
    })
    .then(() => {
      alert("Incident Submitted");
      hideLoader();
      window.location = "homepage.html";
    });
}
