const loginButton = document.getElementById("login-button");
const loginFailedDiv = document.getElementById("login-failed-container");

loginButton.addEventListener("click", function(){

    fetch("http://localhost:3000/login", {
    method: 'POST',
    body: JSON.stringify({"username": document.getElementById("username").value, "password": document.getElementById("password").value}),
    })
    .then(function(response) {
        if (response.status === 202) {
            window.location.href = "http://127.0.0.1:5500/JoJa%20FE/HTML/main.html"
        } else {
            loginFailed = document.createElement("login-failed").innerHTML = "Username or password incorrect.";
            loginFailedDiv.append(loginFailed);
        }
    });
});
