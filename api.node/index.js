const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rota de validação de login
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  // Simulação de validação (substitua por lógica real de validação)
  if (email === 'user@email.com' && senha === 'senha123') {
    res.status(200).json({ sucesso: true, mensagem: 'Login bem-sucedido' });
  } else {
    res.status(401).json({ sucesso: false, mensagem: 'Credenciais inválidas' });
  }
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
