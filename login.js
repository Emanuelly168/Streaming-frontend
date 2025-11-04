document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    message.textContent = '';
    message.className = '';

    if (!email || !password) {
        message.textContent = 'Preencha todos os campos.';
        return;
    }
});     