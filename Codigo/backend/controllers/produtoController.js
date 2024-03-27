const Database = require("../models/Database");
const produtoService = require('../services/produtoService');

const produtoController = {
  async criarProduto(req, res) {
    try {
      const { nome, descricao, valor, tamGarrafa, idImagem, idCategoria } = req.body;

      const produto = await produtoService.criarProduto(nome, descricao, valor, tamGarrafa, idImagem, idCategoria);

      res.status(201).json(produto);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({ message: 'Erro ao criar produto' });
    }
  },

  async buscarProdutoPorNome(req, res) {
    const nome = req.params.nome;
    try {
      const produto = await produtoService.buscarProdutoPorNome(nome);
      res.json(produto);
    } catch (error) {
      console.error('Erro ao buscar produto por nome:', error);
      res.status(500).json({ message: 'Erro ao buscar produto por nome' });
    }
  },

  async buscarProdutoPorId(req, res) {
    const id = req.params.id;
    try {
      const produto = await produtoService.buscarProdutoPorId(id);
      res.json(produto);
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar produto por ID' });
    }
  },

  async listarTodosProdutos(req, res) {
    try {
      const produtos = await produtoService.listarTodosProdutos();
      res.json(produtos);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      res.status(500).json({ message: 'Erro ao listar produtos' });
    }
  },

  async atualizarProduto(req, res) {
    const id = req.params.id;
    const { nome, descricao, valor, tamGarrafa, idImagem, idCategoria } = req.body;
    try {
      const produto = await produtoService.atualizarProduto(id, nome, descricao, valor, tamGarrafa, idImagem, idCategoria);
      res.json(produto);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
  },

  async excluirProduto(req, res) {
    const id = req.params.id;
    try {
      await produtoService.excluirProduto(id);
      res.json({ message: 'Produto excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      res.status(500).json({ message: 'Erro ao excluir produto' });
    }
  }
};

module.exports = produtoController;
