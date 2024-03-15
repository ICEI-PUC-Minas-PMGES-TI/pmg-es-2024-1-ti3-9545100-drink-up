const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize'); // Importe o Sequelize
const { sequelize } = require('./backend/models/index'); // Atualize o caminho conforme necessário
const Produto = require('./backend/models/Produto')(sequelize, Sequelize.DataTypes); // importa produto

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor está rodando!');
});

app.post('/create-product', async (req, res) => {
  try {
    // Extrair os dados da solicitação
    const { nome, descricao, valor, id_categoria } = req.body;

    if (!nome || !descricao || !valor || !id_categoria) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }
    
    // cria produto no banco de dados usando o Sequelize
    const novoProduto = await Produto.create({
      nome,
      descricao,
      valor,
      id_categoria
    });

    // novo produto criado
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao criar o produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

const startApp = async () => {
  try {
    await sequelize.sync();
    console.log('Conexão com o banco de dados e sincronização realizadas com sucesso.');
    app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
  } catch (error) {
    console.error('Não foi possível iniciar a aplicação:', error);
  }
};

startApp();
