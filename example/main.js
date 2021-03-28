function signInClicked() {
  const redirect = "https://redirect-back-to-your-home-page.com";
  window.location.href = "https://acme-cloud.byndid.com/start?redirect=" + redirect;
}

function registerClicked() {
  // This is triggered when the user taps the "sign up" button.
  // Your sign up action should include a call to the Beyond Identity
  // API to create a user credential as well as a way for the user to
  // download the Beyond Identity App to store the credential associated
  // with your app.
}

function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);
  const session = urlParams.get("session");
  if (session === null) {
      return;
  }

  // NOTE: This is where you would add logic as shown below in order
  // to query the session on the backend and get the user's relevant
  // info. In the case of this example, CORS prevents us from making
  // a GET request to the server so we will unsafely log the user in
  // as long as a session is specified.

  const main = document.getElementById("main");
  main.innerHTML = "You are now logged in!";

  // Example: Validating a session:
  //
  // If a session is passed in as a URL param and it exists
  // on the server, then we can log the user in.
  //
  // const xmlHttp = new XMLHttpRequest();
  // xmlHttp.onreadystatechange = function() { 
  //     if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
  //         // At this point, your session exists and you
  //         // are logged in.
  //         const main = document.getElementById("main");
  //         main.innerHTML = "You are now logged in!";
  //     } else {
  //         alert("Invalid session. Failed to log you in.");
  //     }
  // }
  // xmlHttp.open("GET", "https://acme-cloud.byndid.com/balance?session=" + session, true); // true for asynchronous 
  // xmlHttp.send(null);
}
