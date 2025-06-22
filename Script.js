document.addEventListener("DOMContentLoaded", function () {
    
    const header = document.createElement("header");

    const h1 = document.createElement("h1");
    h1.textContent = "Pagina de contato";
    header.appendChild(h1);

    const link = document.createElement("a");
    link.href = "index.html";
    link.id = "voltar";
    link.textContent = "Voltar Para Pagina principal";
    header.appendChild(link);

    
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = "feedback";

    const aviso = document.createElement("p");
    aviso.id = "aviso";
    aviso.textContent = "A avaliação do nosso serviço é fundamental, Mande seu feedback abaixo:";
    feedbackDiv.appendChild(aviso);

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Escreva aqui";
    textarea.id = "mensagem";
    feedbackDiv.appendChild(textarea);

    const buttonDiv = document.createElement("div");
    const button = document.createElement("button");
    button.id = "butao";
    button.textContent = "Clique aqui para enviar";
    button.onclick = clicou;
    buttonDiv.appendChild(button);

    feedbackDiv.appendChild(buttonDiv);

    
    document.body.appendChild(header);
    document.body.appendChild(feedbackDiv);
});


function clicou() {
    alert("Feedback enviado! Obrigado.");
}