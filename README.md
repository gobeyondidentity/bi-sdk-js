![Beyond-Identity-768x268](https://user-images.githubusercontent.com/6456218/111526630-5c826d00-8735-11eb-84ae-809af105b626.jpeg)

## SDKs
### Authenticator
The authenticator SDK will be used in conjunction with the existing Beyond Identity Authenticator for native clients Android, iOS, macOS, Windows, where most of the heavy lifting will be left up to them.

### Embedded
WIP: This will be a holistic SDK solution for CIAM clients, offering the entire experience embedded in their product.

> :information_source: The JavaScript Authenticator and Embedded SDKs are currently a work in progress. For the time being, you'll need to manually add the html/css/js to your project.

### Authorization Server Requirements
Authorization servers should not require public clients maintain client secrets. Clients should opt for Universal Links as a redirect. PCKE support is coming soon to mitigate risk using a Custom URL Scheme.

## Usage
Currently, Beyond Identity only supports clients with a backend. This allows for two flows: 

1. [Confidential Client Handles Everything](#Confidential-Client-Handles-Everything)  
The confidential client (backend) is configured to get the authorization code and exchange that code for an access token and id token.

<img width="1024" alt="Screen Shot 2021-03-24 at 4 18 26 PM" src="https://user-images.githubusercontent.com/6456218/112377859-9b2ba080-8cbc-11eb-95f0-a0f32973da68.png">

2. [Public Client And Confidential Client](#Public-Client-And-Confidential-Client)  
The public client (mobile app) queries for the authorization code and your confidential client (backend) makes the token exchange.

<img width="1024" alt="Screen Shot 2021-03-24 at 4 18 14 PM" src="https://user-images.githubusercontent.com/6456218/112377947-b39bbb00-8cbc-11eb-8b08-89b68e5b20c2.png">

### View Setup

Currently, there is no JavaScript SDK to provide you with the required views and logic. For now, you will need to manually add the following html/css/js to your codebase:

### html

```html
<link rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Overpass">
  
<div id="auth-view">
  <table>
    <tr><td>
      <button id="sign-in-button" onclick="signInClicked()">
        <img src="https://beyondidentity.s3.us-east-2.amazonaws.com/logo.png"
             alt="Logo">
        Log in with Beyond Identity
      </button>
    </td></tr>
    <tr><td>
      <button id="register-button" onclick="registerClicked()">
        New to Beyond Identity? Go passwordless today
        <img src="https://beyondidentity.s3.us-east-2.amazonaws.com/arrow-right.png"
             alt="Rightward facing arrow">
      </button>
    </td></tr>
  </table>
</div>
```

### CSS

```css
#auth-view #sign-in-button {
  margin-bottom: 4px;
  height: 40px;
  font-size: 15px;
  background-color: #4673d3;
  color: #ffffff;
  border: none;
  border-radius: 3px;
}

#auth-view #register-button {
  height: 30px;
  font-size: 12px;
  border: solid;
  border-width: 1px;
  border-radius: 3px;
  border-color: #595959;
  background-color: #ffffff;
  color: #595959;
}

#auth-view table button {
  width: 100%;
  font-family: "Overpass", serif;
}

#auth-view #sign-in-button img {
  width: 17px;
  height: 17px;
  vertical-align: middle;
  margin-bottom: 2px;
  margin-right: 2px;
}

#auth-view #register-button img {
  height: 10px;
  margin-left: 4px;
}
```

### JavaScript

```javascript
function signInClicked() {}

function registerClicked() {}
```

- **Sign In Button**: When the user taps this button, this will redirect the user through one of two flow. If you opt for the first flow where cloud handles everything, you'll need to redirect to your confidential client. Your confidential client will handle requesting the authorization code and exchanging that for an access token before returning back to the app.

- **Sign Up Button**: Your sign up action should include a call to the Beyond Identity API to create a user credential as well as a way for the user to [download the Beyond Identity App](https://app.byndid.com/downloads) to store the credential associated with your app. 

### Confidential Client Handles Everything
In this scenerio your confidential client (backend) handles getting the authorization code and exchanging that for an access token and id token. 

It is up to the developer to decide how to invoke their confidential client in order to initiate the flow, as well as what the response would be. As an example, a response could be a session id associated with the authenticated user or the userinfo payload that was queried on the confidential client.

In order to use this flow, manually add the html/css/js shown above and redirect the user to the authentication webpage that you have configured your confidential client when they click the sign in button.

On completion, the backend should redirect back to your app with an authentication token or anything else you have configured your confidential client to send in that url. In the example, a session is passed back to the app as a url parameter. See the example app for more details.

For more details on configuring your confidential client, see the [Developer Docs](https://docs.byndid.com).

```javascript
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
```

### Public Client And Confidential Client
In this scenario your public client (website) handles getting the authorization code and your confidential client (backend) handles exchanging that code for an access token and id token.

It is up to the developer to decide what the response would be for your confidential client. As an example, a response could be a session id associated with the authenticated user or the userinfo payload that was queried on the confidential client.

The Beyond Identity `/authorize` endpoint supports the following parameters:
* `client_id`: unique ID for a tenant's registered OIDC client.
* `redirect_uri`: must match one of the configured values for the client.
* `response_type`: Only `code` supported at this time.
* `scope`: must contain `openid` (except for OAuth2).
* `state`: random string that the client can use to maintain state between the request and the callback. 

In order to use this flow, create a URL that points to the authorize endpoint with the above parameters and redirect to it. Note that you will need persist a state parameter so that you can check that the redirect contains the same state. This is required in order to prevent [CSRF attacks](https://www.wikiwand.com/en/Cross-site_request_forgery).

On completion, the authorize endpoint will redirect back to the `redirect_uri` that was specified in the request. You'll need to confirm the state parameter has not changed and then pass the authorization code to your backend to exchange for an access token and id token.

For more details, see the [Developer Docs](https://docs.byndid.com).

```javascript
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
}

function signInClicked() {
  const state = uuidv4();
  window.localStorage.setItem("state", state);

  const url = new URL("https://auth.byndid.com/v2/authorize");
  url.searchParams.append("client_id", "<CLIENT_ID>");
  url.searchParams.append("redirect_url", "<REDIRECT_URI>");
  url.searchParams.append("state", state);
  url.searchParams.append("response_type", "code");
  url.searchParams.append("scope", "openid");

  window.location.href = url.href;
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
  const state = urlParams.get("state");
  const code = urlParams.get("code");
  if (state === null || code === null) {
      return;
  }

  const currentState = window.localStorage.getItem("state");
  if (currentState !== state) {
      return;
  }

  // Make a request to your confidential client along with the code.
  // Your confidential client will exchange the code for an access
  // token and send either that or a session back.
} 
```

## Prerequisites
Since most of the heavy lifting is delegated to the Beyond Identity Authenticator client when integrating this flow, you need to [download](https://app.byndid.com/downloads) the app on your development device.

## Sample App and Walkthrough
- A sample apps is available to explore [here](https://github.com/byndid/bi-sdk-js/tree/main/example). 

- You can also try registering and logging in without a password with a fictional financial services demo app [Acme Pay](https://acme-app.byndid.com/). 

https://www.beyondidentity.com/customer-passwordless-solution/live-demo
