document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById('emailFeedback').textContent = 'Email inválido';
    return;
  }

  try {
    const response = await fetch('/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: document.getElementById('nome').value,
        email: email,
        senha: document.getElementById('senha').value,
        telefone: document.getElementById('telefone').value
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      alert('Cadastro realizado com sucesso!');
    } else {
      alert(`Erro: ${result.message || 'Erro no cadastro'}`);
    }
  } catch (error) {
    alert('Erro ao conectar com o servidor');
  }
});
