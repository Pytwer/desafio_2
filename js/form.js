document.querySelectorAll('.custom-checkbox').forEach((checkboxContainer) => {
    const checkbox = checkboxContainer.querySelector('input[type="checkbox"]');

    checkboxContainer.addEventListener('click', (event) => {
        // Evita que o evento seja disparado múltiplas vezes
        event.stopPropagation();

        // Remove a classe 'selected' de todos os botões e desmarca os checkboxes
        document.querySelectorAll('.custom-checkbox').forEach((option) => {
            option.classList.remove('selected');
            option.querySelector('input[type="checkbox"]').checked = false;
        });

        // Adiciona a classe 'selected' e marca o checkbox apenas no botão clicado
        checkbox.checked = true;
        checkboxContainer.classList.add('selected');
    });
});


//botão de enviar.
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inscricaoForm');
    const modal = document.getElementById('confirmationModal');
    const closeModalButton = document.getElementById('closeModal');
    // Função para exibir o modal
    function    showModal() {
        modal.style.display = 'flex';
    }
    // Função para fechar o modal e redirecionar
    function closeModal() {
        modal.style.display = 'none';
        window.location.href = '../index.html'; // Redireciona para a home
    }
    // Evento de envio do formulário
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário
        // Validação dos campos do formulário
        const allFieldsValid = Array.from(form.elements).every(element => {
            if (element.required && !element.value.trim()) {
                return false; // Campo obrigatório não preenchido
            }
            return true;
        });
        if (allFieldsValid) {
            showModal(); // Exibe o modal se todos os campos estiverem preenchidos
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    });
    // Evento de clique no botão "Fechar" do modal
    closeModalButton.addEventListener('click', closeModal);
});

// validação de numero 
const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }
  
  const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.substring(0,11)
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }

// validação de email 
function validacaoEmail(field) {
    const email = field.value.trim();  // Remove espaços no início e no fim
    const usuario = email.substring(0, email.indexOf("@"));
    const dominio = email.substring(email.indexOf("@") + 1);

    // Validações:
    if (
        usuario.length >= 1 &&  // usuário não pode ser vazio
        dominio.length >= 3 &&  // domínio deve ter ao menos 3 caracteres
        usuario.search(" ") === -1 &&  // usuário não pode ter espaços
        dominio.search(" ") === -1 &&  // domínio não pode ter espaços
        dominio.search(".") !== -1 &&  // domínio deve ter pelo menos um ponto
        dominio.indexOf(".") >= 1 &&  // o ponto não pode estar no início
        dominio.lastIndexOf(".") < dominio.length - 1 // o ponto não pode estar no final
    ) {
        // Se for válido:
        document.getElementById("msgemail").innerHTML = "E-mail válido";
        document.getElementById("msgemail").style.color = "green";  // Mensagem verde
    } else {
        // Se for inválido:
        document.getElementById("msgemail").innerHTML = "<font color='red'>E-mail inválido </font>";
        document.getElementById("msgemail").style.color = "red";  // Mensagem vermelha
    }
}

//Seleção de checkbox
function selecionarCheckbox(checkbox) {
    // Seleciona todos os checkboxes dentro da div container
    var checkboxes = document.querySelectorAll('.container input[type="checkbox"]');

    // Se o checkbox foi marcado, desmarca todos os outros
    checkboxes.forEach(function(item) {
        if (item !== checkbox) {
            item.checked = false; // Desmarca os outros checkboxes
        }
    });
}

// inscrição 

function mensagem()
{
    alert("Sua inscrição foi feita como sucesso");
}

window.onload=function(){
    let botaoMensagem = document.getElementById("mensagem");

    botaoMensagem.onclick = function () {
        mensagem() ;
    };
}
document.addEventListener("DOMContentLoaded", function() {
    // Elemento do link de logout
    const logoutLink = document.getElementById("logoutLink");
    
    // Ao clicar no link de voltar
    logoutLink.addEventListener("click", function(event) {
        event.preventDefault(); // Previne o comportamento padrão
        
        // Remove o usuário da sessionStorage (mantendo no localStorage)
        sessionStorage.removeItem('loggedInUser');
        
        // Redireciona para a página inicial
        window.location.href = "/index.html";
    });
    
    // Verifica se há um usuário logado
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        // Se não estiver logado, redireciona para a página de login
        window.location.href = "/index.html";
    }
});
document.addEventListener("DOMContentLoaded", function() {
    // Elementos do DOM
    const modal = document.getElementById("confirmationModal");
    const closeModal = document.getElementById("closeModal");
    const form = document.getElementById("inscricaoForm");
    const logoutLink = document.querySelector(".voltar a");
    
    // 1. Verificação de autenticação e estado do formulário
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    
    if (!loggedInUser) {
        window.location.href = "/index.html";
        return;
    }
    
    if (loggedInUser.hasSubmittedForm) {
        window.location.href = "/pgs/menu.html";
        return;
    }

    // 2. Configuração do modal de confirmação
    function showSuccessModal() {
        modal.style.display = "block";
        
        setTimeout(() => {
            modal.style.display = "none";
            redirectToMenu();
        }, 3000);
    }

    function redirectToMenu() {
        window.location.href = "/pgs/menu.html";
    }

    closeModal.addEventListener("click", function() {
        modal.style.display = "none";
        redirectToMenu();
    });

    // 3. Manipulador de envio do formulário
    form.addEventListener("submit", async function(event) {
        event.preventDefault();
        
        try {
            const formData = new FormData(form);
            
            // Aqui você pode adicionar o envio AJAX real
            /*
            const response = await fetch('/banco/config.php', {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) throw new Error('Erro no servidor');
            */
            
            // Simulando um envio bem-sucedido
            console.log("Arquivos recebidos:", {
                identity: formData.get('identity').name,
                residence: formData.get('residence').name
            });

            updateUserSubmissionStatus();
            showSuccessModal();
            
        } catch (error) {
            console.error("Erro:", error);
            alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.");
        }
    });

    // 4. Atualiza o status de envio do formulário
    function updateUserSubmissionStatus() {
        const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
        user.hasSubmittedForm = true;
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.cpf === user.cpf);
        
        if (userIndex !== -1) {
            users[userIndex].hasSubmittedForm = true;
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    // 5. Logout ao clicar em voltar
    logoutLink.addEventListener("click", function(event) {
        event.preventDefault();
        sessionStorage.removeItem('loggedInUser');
        window.location.href = "/index.html";
    });

    // 6. Removida a parte do preview de imagens
    // (os arquivos ainda serão capturados no FormData durante o envio)

    // 7. Máscaras para campos (opcional)
    if (window.IMask) {
        IMask(document.getElementById('cpf'), {
            mask: '000.000.000-00'
        });
        
        IMask(document.querySelector('[attrname="telephone1"]'), {
            mask: '(00) 00000-0000'
        });
        
        IMask(document.getElementById('cep'), {
            mask: '00000-000'
        });
    }
});
form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Aqui você pode adicionar o envio AJAX se necessário
    
    // Atualiza o usuário no sessionStorage
    const user = JSON.parse(sessionStorage.getItem('loggedInUser'));
    user.hasSubmittedForm = true;
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    
    // Atualiza também no localStorage (para persistência)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.cpf === user.cpf);
    if (userIndex !== -1) {
        users[userIndex].hasSubmittedForm = true;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    // Mostra o modal e redireciona
    modal.style.display = "block";
});

closeModal.addEventListener("click", function() {
    modal.style.display = "none";
    window.location.href = "/pgs/menu.html";
});