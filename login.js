
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Carregando...';

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: document.getElementById('loginEmail').value,
        senha: document.getElementById('loginSenha').value
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      localStorage.setItem('authToken', result.token);
      window.location.href = '/dashboard';
    } else {
      alert(`Falha no login: ${result.message || 'Credenciais inválidas'}`);
    }
  } catch (error) {
    alert('Erro ao conectar com o servidor');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Entrar';
  }
});
