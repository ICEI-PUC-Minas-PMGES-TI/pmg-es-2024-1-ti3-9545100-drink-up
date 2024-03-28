const express = require('express');
const session = require('express-session');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');

const app = express();
const PORT = 3000;

// Configuração de sessão
app.use(session({
  secret: 'drinkupTIS3', //Aparentemente obrigatório
  resave: false,
  saveUninitialized: true
}));

app.use(express.json());
app.use(cors());

// Rotas
app.use(usuarioRoutes);
app.use(clienteRoutes);
app.use(produtoRoutes);
app.use(categoriaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
