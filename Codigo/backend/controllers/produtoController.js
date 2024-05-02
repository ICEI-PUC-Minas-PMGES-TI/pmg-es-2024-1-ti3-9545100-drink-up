const Database = require("../models/Database");
const produtoService = require('../services/produtoService');

class ProdutoController {

  async criarProduto(req, res) {
    try {
      console.log(req.body)
      const { nome, descricao, valor, tam_garrafa, estoque_atual, id_imagem, id_categoria } = req.body;
      const produto = await produtoService.criarProduto(nome, descricao, valor, tam_garrafa, estoque_atual, id_imagem, parseInt(id_categoria));

      res.status(201).json(produto);
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      res.status(500).json({ message: 'Erro ao criar produto'});
    }
  }

 async atualizarEstoqueProduto(req, res) {
    const { id } = req.params; 
    const { estoque_atual } = req.body; 
    try {
      const produtoAtualizado = await produtoService.atualizarEstoque(id, estoque_atual);
      res.json({ message: 'Estoque atualizado!', produto: produtoAtualizado });
    } catch (error) {
      console.error('Erro em atualizar o estoque:', error);
      res.status(500).json({ message: 'Erro em atualizar o estoque' });
    }
}


  async buscarProdutoPorNome(req, res) {
    const nome = req.params.nome;
    try {
      const produto = await produtoService.buscarProdutoPorNome(nome);
      res.json(produto);
    } catch (error) {
      console.error('Erro ao buscar produto por nome:', error);
      res.status(500).json({ message: 'Erro ao buscar produto por nome' });
    }
  }

  async buscarProdutoPorId(req, res) {
    const id = req.params.id;
    try {
      const produto = await produtoService.buscarProdutoPorId(id);
      res.json(produto);
    } catch (error) {
      console.error('Erro ao buscar produto por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar produto por ID' });
    }
  }

  async listarTodosProdutos(req, res) { 
    try {
      const produtos = await produtoService.listarTodosProdutos();
      res.json(produtos);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      res.status(500).json({ message: 'Erro ao listar produtos' });
    }
  }

  async atualizarProduto(req, res) {

    console.log(req.body);

    const { id, nome, descricao, valor, tam_garrafa, id_imagem, id_categoria } = req.body;

    try {
      const produto = await produtoService.atualizarProduto(id, nome, descricao, valor, id_imagem, id_imagem, id_categoria);
      res.json(produto);
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ message: 'Erro ao atualizar produto' });
    }
  }

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

module.exports = ProdutoController;
