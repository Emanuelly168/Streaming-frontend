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

    
    if (!name || !email || !password || !confirmPassword || !phone) {
        message.textContent = 'Preencha todos os campos.';
        message.className = 'error';
        return;
    }
    if (password !== confirmPassword) {
        message.textContent = 'As senhas não coincidem.';
        message.className = 'error';
        return;
    }
    if (password.length < 6) {
        message.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        message.className = 'error';
        return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        message.textContent = 'E-mail inválido.';
        message.className = 'error';
        return;
    }

    const payload = { name, email, password, phone };
    console.log('Enviando para o backend:', payload); 

    try {
        const response = await fetch('/register', {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Resposta do servidor:', data); 

        if (response.ok) {
            message.textContent = data.message;
            message.className = 'success';
            setTimeout(() => window.location.href = 'login.html', 1500);
        } else {
            message.textContent = data.message || 'Erro ao cadastrar.';
            message.className = 'error';
        }
    } catch (err) {
        console.error('Erro no fetch:', err);
        message.textContent = 'Erro de conexão. Verifique o servidor.';
        message.className = 'error';
    }
});