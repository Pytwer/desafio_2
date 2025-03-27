// Função para criar o banco (chamar uma vez no início do sistema)
async function criarBancoDados() {
    try {
        const response = await fetch('php/criar_banco.php');
        const data = await response.json();
        
        if (data.success) {
            console.log('Banco de dados pronto:', data.database);
        } else {
            console.error('Erro ao criar banco:', data.message);
            alert('Erro na inicialização do sistema');
        }
    } catch (error) {
        console.error('Falha na comunicação:', error);
        alert('Não foi possível conectar ao servidor');
    }
}

// Cadastro
document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    criarBancoDados();
    const nome = document.getElementById("registerNome").value;
    const email = document.getElementById("registerEmail").value;
    const cpf = document.getElementById("registerCpf").value.replace(/\D/g, '');
    const registerMessage = document.getElementById("registerMessage");

    // Validações
    if (cpf.length !== 11) {
        showMessage(registerMessage, "CPF deve ter 11 dígitos");
        return;
    }

    if (!validateEmail(email)) {
        showMessage(registerMessage, "Email inválido");
        return;
    }

    try {
        const response = await fetch('php/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, cpf })
        });

        const data = await response.json();

        if (data.success) {
            showMessage(registerMessage, "Cadastro realizado! Use seu email e CPF para login", true);
            setTimeout(() => {
                document.getElementById("registerForm").reset();
                toggleForms(true); // Volta para o login
            }, 3000);
        } else {
            showMessage(registerMessage, data.message || "Erro no cadastro");
        }
    } catch (error) {
        showMessage(registerMessage, "Erro de conexão com o servidor");
        console.error(error);
    }
});

// Função auxiliar para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}