document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegisterForm = document.getElementById("showRegisterForm");
    const showLoginForm = document.getElementById("showLoginForm");
    const loginButton = document.getElementById("loginButton");
    const registerButton = document.getElementById("registerButton");
    const loginMessage = document.getElementById("loginMessage");
    const registerMessage = document.getElementById("registerMessage");

    let userData = {}; // Armazenar dados do usuário

    // Mostrar o formulário de cadastro
    showRegisterForm.addEventListener("click", function(event) {
        event.preventDefault();
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    });

    // Mostrar o formulário de login
    showLoginForm.addEventListener("click", function(event) {
        event.preventDefault();
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });

    // Lidar com o envio do formulário de login
    loginButton.addEventListener("click", function(event) {
        event.preventDefault();
        const cpf = document.getElementById("loginCpf").value.replace(/\D/g, ''); // Remove formatação
        const password = document.getElementById("loginPassword").value;

        // Verificar se os dados estão corretos
        if (userData.cpf === cpf && userData.password === password) {
            loginMessage.style.display = "none";
            // Redirecionar para o formulário ou página desejada
            window.location.href = "/pgs/inscrição.html"; // Descomente e altere para a URL desejada
        } else {
            loginMessage.textContent = "CPF ou senha incorretos.";
            loginMessage.style.display = "block";
        }
    });

    // Lidar com o envio do formulário de cadastro
    registerButton.addEventListener("click", function(event) {
        event.preventDefault();
        const cpf = document.getElementById("registerCpf").value.replace(/\D/g, ''); // Remove formatação
        const password = document.getElementById("registerPassword").value;

        // Verificação se os campos estão vazios
        if (!cpf || !password) {
            registerMessage.textContent = "Por favor, preencha todos os campos.";
            registerMessage.style.display = "block";
            return;
        }

        // Validação do CPF
        if (cpf.length !== 11) {
            registerMessage.style.display = "block";
            return;
        }

        // Validação da Senha
        if (password.length < 6 || password.length > 10) {
            registerMessage.textContent = "A senha deve ter entre 6 e 10 dígitos.";
            registerMessage.style.display = "block";
            return;
        }

        // Salvar os dados do usuário
        userData = { cpf, password };
        registerMessage.textContent = "Cadastro realizado com sucesso! Você pode fazer login agora.";
        registerMessage.style.display = "block";

        // Voltar para o formulário de login após um pequeno atraso
        setTimeout(() => {
            registerForm.style.display = "none";
            loginForm.style.display = "block";
            registerMessage.style.display = "none"; // Ocultar mensagem de registro
        }, 2000);
    });
});

document.getElementById("formContainer").addEventListener("submit" ,function(event){
    event.preventDefault()
    const mail = document.getElementById("mail").value
    const pass = document.getElementById("password").value
    const resp = document.getElementById("registerForm").value
    const formData = new FormData()
    formData.append("mail",mail)
    formData.append("pass",pass)
    fetch("http://localhost/phpmyadmin/index.php?route=/sql&db=banco&table=users&pos=0", {
        method: "POST",
        mode: "no-cors",
        body: FormData
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("usstat",data.logd)
        localStorage.setItem("")
    })
});