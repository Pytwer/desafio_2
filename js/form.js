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
// validação de cpf 
let cpf = document.querySelector("#cpf");
cpf.addEventListener("blur", function(){
   if(cpf.value) cpf.value = cpf.value.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/,"-");
});

//botão de enviar.
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('inscricaoForm');
    const modal = document.getElementById('confirmationModal');
    const closeModalButton = document.getElementById('closeModal');
    // Função para exibir o modal
    function showModal() {
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

// validação de cep 

const handleZipCode = (event) => {
    let input = event.target
    input.value = zipCodeMask(input.value)
  }
  
  const zipCodeMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.substring(0,8)
    value = value.replace(/(\d{5})(\d)/,'$1-$2')
    return value
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