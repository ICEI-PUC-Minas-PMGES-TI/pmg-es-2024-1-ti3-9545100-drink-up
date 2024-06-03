const express = require('express');
const session = require('express-session');
const cors = require('cors');

const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const estoqueRoutes = require('./routes/estoqueRoutes');
const carrinhoRoutes = require('./routes/carrinhoRoutes');
const freteRoutes = require('./routes/freteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const imagemRoutes = require('./routes/imagemRoutes'); 

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use(usuarioRoutes);
app.use(clienteRoutes);
app.use(produtoRoutes);
app.use(categoriaRoutes);
app.use(estoqueRoutes);
app.use(carrinhoRoutes);
app.use(freteRoutes);
app.use(pedidoRoutes);
app.use(imagemRoutes); 

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
