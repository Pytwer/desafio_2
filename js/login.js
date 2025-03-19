//Seleciona os elementos
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterFormLink = document.getElementById('showRegisterForm');
const showLoginFormLink = document.getElementById('showLoginForm');

// Adiciona eventos de clique aos links
showRegisterFormLink.addEventListener('click', function (e) {
    e.preventDefault(); // Evita o comportamento padrão do link
    loginForm.style.display = 'none'; // Oculta o formulário de login
    registerForm.style.display = 'block'; // Mostra o formulário de cadastro
});

showLoginFormLink.addEventListener('click', function (e) {
    e.preventDefault(); // Evita o comportamento padrão do link
    registerForm.style.display = 'none'; // Oculta o formulário de cadastro
    loginForm.style.display = 'block'; // Mostra o formulário de login
});