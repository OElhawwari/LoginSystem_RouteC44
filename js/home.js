
// Variables :

var logoutBtn = document.getElementById('logoutBtn');
var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('wlcMsg').innerHTML = `Welcome ${username} !`
} else {
    window.location.href = "index.html";
}



function logout() {
    localStorage.removeItem('sessionUsername')
}

logoutBtn.addEventListener('click', function (e) {
    logout();
    window.location.href = "index.html";
})