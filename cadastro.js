document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const message = document.getElementById('message');

    message.textContent = '';
    message.className = '';

    if (!name || !email || !password || !confirmPassword) {
        message.textContent = 'Preencha todos os campos.';
        return;
    }
    if (password !== confirmPassword) {
        message.textContent = 'As senhas não coincidem.';
        return;
    }
    if (password.length < 6) {
        message.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        message.textContent = 'E-mail inválido.';
        return;
    }
});