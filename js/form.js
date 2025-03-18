//botões do trilha
document.querySelectorAll('.trilha-option input[type="radio"]').forEach((radio) => {
    radio.addEventListener('change', function () {
        // Remove a classe de seleção de todas as opções
        document.querySelectorAll('.trilha-option').forEach((option) => {
            option.classList.remove('selected');
        });

        // Adiciona a classe de seleção à opção clicada
        if (this.checked) {
            this.closest('.trilha-option').classList.add('selected');
        }
        
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
var dateControl = document.querySelector('input[type="date"]');
dateControl.value = "2025-03-18";
