const Database = require('../models/Database');
const Produto = require('../models/Produto');
const Estoque = require('../models/Estoque');

const database = new Database();
database.connect(); // Conectar ao banco de dados

async function estoqueEntradaSaida(idProduto, quantidade, tipo, observacao) {
    // Verifica o tipo de operação e atualiza o estoque atual do produto
    const produto = await Produto.findByPk(idProduto);

    if (!produto) {
        throw new Error('Produto não encontrado');
    }

    try {
        switch (tipo) {
            case 'entrada':
                produto.estoque_atual = parseInt(produto.estoque_atual) + parseInt(quantidade);
                break;
            case 'saida':
                if (parseInt(produto.estoque_atual) >= parseInt(quantidade)) {
                    produto.estoque_atual = parseInt(produto.estoque_atual) - parseInt(quantidade);
                } else {
                    throw new Error('Produto com quantidade insuficiente');
                }
                break;
            default:
                throw new Error('Tipo de operação inválido');
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

    } catch (error) {
        console.error('Erro ao atualizar estoque:', error);
        throw new Error('Erro ao atualizar estoque');
    }
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
        const produto = await Produto.findOne({ where: { nome } });
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

async function relatorioMovimentoEstoque() {
    try {
        const sequelize = database.getInstance(); // Obter instância do Sequelize aqui
        const [results, metadata] = await sequelize.query(`
            SELECT 
                cat.descricao AS 'Tipo', 
                SUM(est.quantidade) AS 'Qnt', 
                prd.valor AS 'Valor', 
                prd.nome AS 'NomedaBebida',
                est.observacao AS 'DescricaoSaida',
                est.tipo AS 'Movimentacao'
            FROM
                tb_estoque est
                INNER JOIN tb_produto prd ON est.id_produto = prd.id
                INNER JOIN tb_categoria cat ON prd.id_categoria = cat.id
            GROUP BY
                prd.id, est.tipo, est.observacao
            ORDER BY 1 ASC, 4 ASC, 2 DESC, 5 ASC, 6 ASC
        `);
        return results;
    } catch (error) {
        console.error('Erro ao exibir relatório:', error);
        throw new Error('Erro ao exibir relatório');
    }
}

module.exports = {
    estoqueEntradaSaida,
    listarEstoqueCompleto,
    listarEstoquePorProduto,
    relatorioMovimentoEstoque
};
