
// Mise sur écoute du bouton login dans le formulaire login
let formLogin = document.getElementById("login");
formLogin.addEventListener("submit", (event) =>{
    event.preventDefault();

    let baliseUsername = document.getElementById("userName")
    let username = baliseUsername.value
    let balisePsswd = document.getElementById("psswd")
    let psswd = balisePsswd.value
    console.log(`user ${username} and pass ${psswd}`)
});