// server.js

const cors = require('cors');

const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes')

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

// Usar as rotas relacionadas aos usuários
app.use(usuarioRoutes);
app.use(clienteRoutes);
app.use(produtoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
