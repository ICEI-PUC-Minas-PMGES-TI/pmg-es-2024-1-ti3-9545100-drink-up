const imagemService = require('../services/imagemService');

const imagemController = {
  async uploadImagem(req, res) {
    try {
      const { nome, caminho } = req.body;
      const imagem = await imagemService.criarImagem(nome, caminho);
      res.status(201).json(imagem);
    } catch (error) {
      console.error('Erro ao fazer upload de imagem:', error);
      res.status(500).json({ message: 'Erro ao fazer upload de imagem' });
    }
  },

  async buscarImagemPorId(req, res) {
    const id = req.params.id;
    try {
      const imagem = await imagemService.buscarImagemPorId(id);
      res.json(imagem);
    } catch (error) {
      console.error('Erro ao buscar imagem por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar imagem por ID' });
    }
  },

  async listarTodasImagens(req, res) {
    try {
      const imagens = await imagemService.listarTodasImagens();
      res.json(imagens);
    } catch (error) {
      console.error('Erro ao listar imagens:', error);
      res.status(500).json({ message: 'Erro ao listar imagens' });
    }
  },

  async atualizarImagem(req, res) {
    const id = req.params.id;
    const { nome, caminho } = req.body;
    try {
      const imagem = await imagemService.atualizarImagem(id, nome, caminho);
      res.json(imagem);
    } catch (error) {
      console.error('Erro ao atualizar imagem:', error);
      res.status(500).json({ message: 'Erro ao atualizar imagem' });
    }
  },

  async excluirImagem(req, res) {
    const id = req.params.id;
    try {
      await imagemService.excluirImagem(id);
      res.json({ message: 'Imagem excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir imagem:', error);
      res.status(500).json({ message: 'Erro ao excluir imagem' });
    }
  }
};

module.exports = imagemController;
