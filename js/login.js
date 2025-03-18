const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterForm = document.getElementById('showRegisterForm');
const showLoginForm = document.getElementById('showLoginForm');

// Mostrar formulário de cadastro
showRegisterForm.addEventListener('click', (e) => {
    e.preventDefault(); // Evita o comportamento padrão do link
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

// Mostrar formulário de login
showLoginForm.addEventListener('click', (e) => {
    e.preventDefault(); // Evita o comportamento padrão do link
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
});