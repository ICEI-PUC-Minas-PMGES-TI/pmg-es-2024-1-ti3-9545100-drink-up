// server.js

const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes')

const app = express();
const PORT = 3000;

app.use(express.json());

// Usar as rotas relacionadas aos usuários
app.use(usuarioRoutes);
app.use(clienteRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
