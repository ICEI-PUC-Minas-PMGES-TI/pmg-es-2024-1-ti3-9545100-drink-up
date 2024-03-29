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
        produto.estoque_atual += quantidade;
    } else if (tipo === 'saida') { // Saída
        produto.estoque_atual -= quantidade;
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

module.exports = {
    estoqueEntradaSaida
};
