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
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const modal = document.getElementById('confirmationModal');
    const closeModalButton = document.getElementById('closeModal');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Exibe o modal
        modal.style.display = 'flex';

        // Fecha o modal e redireciona para a home quando o botão "Fechar" é clicado
        closeModalButton.addEventListener('click', function() {
            modal.style.display = 'none';
            window.location.href = '/pgs/index.html'; // Redireciona para a home
        });
    });
});