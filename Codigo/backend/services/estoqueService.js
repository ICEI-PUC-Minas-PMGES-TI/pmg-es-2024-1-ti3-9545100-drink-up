const Database = require("../models/Database");
const Produto = require("../models/Produto");
const Estoque = require("../models/Estoque")

async function estoqueEntradaSaida(idProduto, quantidade, tipo, observacao) {
    // Verifica o tipo de operação e atualiza o estoque atual do produto
    const produto = await Produto.findByPk(idProduto);

    if (!produto) {
        throw new Error('Produto não encontrado');
    }

    if (tipo === 'entrada') { // Entrada
        produto.estoque_atual = parseInt(produto.estoque_atual) + parseInt(quantidade);
    } else if (tipo === 'saida') { // Saída
        produto.estoque_atual = parseInt(produto.estoque_atual) - parseInt(quantidade);
    }
    await produto.save();

    // Crie o registro de movimento no estoque
    await Estoque.create({
        quantidade: quantidade,
        tipo: tipo,
        observacao: observacao,
        id_produto: idProduto
    });

    return produto;
}

async function listarEstoqueCompleto() {
    try {
        const estoque = await Estoque.findAll();
        return estoque;
    } catch (error) {
        console.error('Erro ao listar estoque:', error);
        throw new Error('Erro ao listar estoque');
    }
}

async function listarEstoquePorProduto(nome) {
    try {
        const produto = await Produto.findOne({ where: { nome }});
        if (!produto) {
            throw new Error('Produto não encontrado');
        }
        const estoque = await Estoque.findAll({ where: { id_produto: produto.id } });
        return estoque;
    } catch (error) {
        console.error('Erro ao buscar estoque por nome:', error);
        throw new Error('Erro ao buscar estoque por nome');
    }
}

module.exports = {
    estoqueEntradaSaida,
    listarEstoqueCompleto,
    listarEstoquePorProduto
};
