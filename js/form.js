


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
function redirecionar() {
    // Redireciona para a página desejada
    window.location.href = "google.com";
}