// Verifica se está logado
if (!sessionStorage.getItem('loggedInUser')) {
    window.location.href = "/index.html";
}

// Logout
document.querySelector('.logout').addEventListener('click', function() {
    sessionStorage.removeItem('loggedInUser');
});