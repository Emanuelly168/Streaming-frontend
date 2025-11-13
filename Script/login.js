document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    message.textContent = '';
    message.className = '';

    if (!email || !password) {
        message.textContent = 'Preencha todos os campos.';
        message.classList.add('error');
        return;
    }

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            message.textContent = data.message || 'Login realizado com sucesso!';
            message.classList.add('success');

            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 1000);

        } else {
            message.classList.add('error');
            message.textContent = data.message || 'E-mail ou senha incorretos.';
        }

    } catch (error) {
        console.error('Erro:', error);
        message.classList.add('error');
        message.textContent = 'Erro de conexão. Verifique o servidor.';
    }
});