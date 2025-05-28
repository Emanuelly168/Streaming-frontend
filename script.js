//logica completa, simples mas foi o que conseguimos fazer, back será entregado depois

function clicou(){
let mensagem = document.getElementById("mensagem").value

if (!mensagem.trim()) {
    alert("Mensagem invalida ou em Branco")

 }else{
    
    document.getElementById("aviso").innerHTML = "Feedback enviado, logo responderemos você!"
    document.getElementById("mensagem").value = ""
 }

}