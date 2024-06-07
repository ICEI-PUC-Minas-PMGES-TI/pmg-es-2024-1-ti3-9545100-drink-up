const pedidoService = require('../services/pedidoService');
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

async function alterarEnderecoPedido(req, res) {
    try {
        const { id } = req.params;
        const { endereco } = req.body;
        console.log(endereco)
        const pedidos = await pedidoService.alterarEnderecoPedido(endereco, id);
        res.json(pedidos);
    } catch (error) {
        console.error('Erro ao alterar endereco do pedido:', error);
        res.status(500).json({ error: 'Erro ao alterar endereco do pedido' });
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


async function listarItensDoPedido(req, res) {
    try {
        const { id } = req.params;
        const listaItens = await pedidoService.listarItensDoPedido(id);
        if (listaItens) {
            res.json(listaItens);
        } else {
            res.status(404).json({ error: 'Lista não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao buscar lista por ID:', error);
        res.status(500).json({ error: 'Erro ao buscar lista por ID' });
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
async function atualizarStatusPedido(req, res) {
    try {
        const { id } = req.params;
        const { status_pedido } = req.body;
        const pedido = await pedidoService.atualizarStatusPedido(id, status_pedido);
        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ error: 'Pedido não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao atualizar status do pedidos:', error);
        res.status(500).json({ error: 'Erro ao atualizar status do pedidos' });
    }
}
 
module.exports = {
    criarPedido,
    alterarEnderecoPedido,
    listarTodosPedidos,
    buscarPedidoPorId,
    atualizarPedido,
    atualizarStatusPedido,
    listarItensDoPedido
    //excluirPedido,
};
