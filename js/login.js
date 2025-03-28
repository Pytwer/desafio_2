document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegisterForm = document.getElementById("showRegisterForm");
    const showLoginForm = document.getElementById("showLoginForm");
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const loginMessage = document.getElementById("loginMessage");
    const registerMessage = document.getElementById("registerMessage");

    // Armazenar dados dos usuários (persistirá enquanto a página não for recarregada)
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Mostrar o formulário de cadastro
    showRegisterForm.addEventListener("click", function(event) {
        event.preventDefault();
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        registerMessage.style.display = "none";
    });

    // Mostrar o formulário de login
    showLoginForm.addEventListener("click", function(event) {
        event.preventDefault();
        registerForm.style.display = "none";
        loginForm.style.display = "block";
        loginMessage.style.display = "none";
    });

    // Lidar com o envio do formulário de login
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const cpf = document.getElementById("loginCpf").value.replace(/\D/g, '');
        const password = document.getElementById("loginPassword").value;

        // Verificar se existe um usuário com esses dados
        const user = users.find(u => u.cpf === cpf && u.password === password);
        
       // No trecho onde o login é bem-sucedido
        if (user) {
            loginMessage.style.display = "none";
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            
            window.location.href = "/pgs/menu.html"; 
        }
        else {
            loginMessage.textContent = "CPF ou senha incorretos.";
            loginMessage.style.display = "block";
        }
    });

    // Lidar com o envio do formulário de cadastro
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const cpf = document.getElementById("registerCpf").value.replace(/\D/g, '');
        const password = document.getElementById("registerPassword").value;

        // Verificação se os campos estão vazios
        if (!cpf || !password) {
            registerMessage.textContent = "Por favor, preencha todos os campos.";
            registerMessage.style.display = "block";
            return;
        }

        // Validação do CPF
        if (cpf.length !== 11) {
            registerMessage.textContent = "CPF inválido. Deve conter 11 dígitos.";
            registerMessage.style.display = "block";
            return;
        }

        // Validação da Senha
        if (password.length < 6 || password.length > 10) {
            registerMessage.textContent = "A senha deve ter entre 6 e 10 dígitos.";
            registerMessage.style.display = "block";
            return;
        }

        // Verificar se o CPF já está cadastrado
        if (users.some(u => u.cpf === cpf)) {
            registerMessage.textContent = "Este CPF já está cadastrado.";
            registerMessage.style.display = "block";
            return;
        }

        // Adicionar novo usuário
        users.push({ cpf, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        registerMessage.textContent = "Cadastro realizado com sucesso! Você pode fazer login agora.";
        registerMessage.style.color = "green";
        registerMessage.style.display = "block";

        // Limpar formulário
        document.getElementById("registerCpf").value = "";
        document.getElementById("registerPassword").value = "";

        // Voltar para o formulário de login após 2 segundos
        setTimeout(() => {
            registerForm.style.display = "none";
            loginForm.style.display = "block";
            registerMessage.style.display = "none";
        }, 2000);
    });
});