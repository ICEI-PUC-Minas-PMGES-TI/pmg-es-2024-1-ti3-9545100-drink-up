const express = require('express');
const cors = require('cors');
const { sequelize, Produto } = require('./backend/models/index');

const app = express();
app.use(express.json());
app.use(cors());
app.post('/create-product', async (req, res) => {
    try {
        const { nome, descricao, valor, id_categoria } = req.body;
        const produto = await Produto.create({ nome, descricao, valor, id_categoria });
        const novoProduto = await Produto.findByPk(produto.id);
        res.status(201).json(novoProduto);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
        await sequelize.sync();
        console.log('Modelos sincronizados com sucesso.');
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    } catch (error) {
        console.error('Não foi possível iniciar o servidor:', error);
    }
};

startServer();
