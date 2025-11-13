document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.querySelector(".contact-form form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("message").value.trim();

        if (!nome || !email || !mensagem) {
            alert("Por favor, preencha todos os campos antes de enviar.");
            return;
        }

        alert("Mensagem enviada! Obrigado pelo seu contato.");
        contactForm.reset();
    });
});
