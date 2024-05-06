const pedidoService = require('../services/PedidoService');
const Database = require("../models/Database");


// Controlador para criação de um pedido
async function criarPedido(req, res) {
    try {
        const { itens_do_carrinho, endereco, id_cliente } = req.body;
        const pedido = await pedidoService.criarPedido(itens_do_carrinho, endereco, id_cliente);
        res.status(201).json(pedido);
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ error: 'Erro ao criar pedido' });
    }
}

// Controlador para listar todos os pedidos
async function listarTodosPedidos(req, res) {
    try {
        const pedidos = await pedidoService.listarTodosPedidos();
        res.json(pedidos);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({ error: 'Erro ao listar pedidos' });
    }
}

// Controlador para buscar um pedido por ID
async function buscarPedidoPorId(req, res) {
    try {
        const { id } = req.params;
        const pedido = await pedidoService.buscarPedidoPorId(id);
        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ error: 'Pedido não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao buscar pedido por ID:', error);
        res.status(500).json({ error: 'Erro ao buscar pedido por ID' });
    }
}

// Controlador para atualizar um pedido
async function atualizarPedido(req, res) {
    try {
        const { id } = req.params;
        const { nome, dataNascimento, telefone, endereco_param } = req.body;
        const pedido = await pedidoService.atualizarPedido(id, nome, dataNascimento, telefone, endereco_param);
        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ error: 'Pedido não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
        res.status(500).json({ error: 'Erro ao atualizar pedido' });
    }
}

// Controlador para excluir um pedido
async function excluirPedido(req, res) {
    try {
        const { id } = req.params;
        const pedido = await pedidoService.excluirPedido(id);
        if (pedido) {
            res.json({ message: 'Pedido excluído com sucesso' });
        } else {
            res.status(404).json({ error: 'Pedido não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao excluir pedido:', error);
        res.status(500).json({ error: 'Erro ao excluir pedido' });
    }
}

module.exports = {
    criarPedido,
    listarTodosPedidos,
    buscarPedidoPorId,
    atualizarPedido,
    excluirPedido,
};