const Imagem = require('../models/Imagem');

const imagemService = {
  async criarImagem(nome, caminho) {
    try {
      const imagem = await Imagem.create({ nome, caminho });
      return imagem;
    } catch (error) {
      console.error('Erro ao criar imagem:', error);
      throw new Error('Erro ao criar imagem');
    }
  },

  async buscarImagemPorId(id) {
    try {
      const imagem = await Imagem.findByPk(id);
      return imagem;
    } catch (error) {
      console.error('Erro ao buscar imagem por ID:', error);
      throw new Error('Erro ao buscar imagem por ID');
    }
  },

  async listarTodasImagens() {
    try {
      const imagens = await Imagem.findAll();
      return imagens;
    } catch (error) {
      console.error('Erro ao listar imagens:', error);
      throw new Error('Erro ao listar imagens');
    }
  },

  async atualizarImagem(id, nome, caminho) {
    try {
      const imagem = await Imagem.findByPk(id);
      if (!imagem) {
        throw new Error('Imagem não encontrada');
      }
      imagem.nome = nome;
      imagem.caminho = caminho;
      await imagem.save();
      return imagem;
    } catch (error) {
      console.error('Erro ao atualizar imagem:', error);
      throw new Error('Erro ao atualizar imagem');
    }
  },

  async excluirImagem(id) {
    try {
      const imagem = await Imagem.findByPk(id);
      if (!imagem) {
        throw new Error('Imagem não encontrada');
      }
      await imagem.destroy();
      return true;
    } catch (error) {
      console.error('Erro ao excluir imagem:', error);
      throw new Error('Erro ao excluir imagem');
    }
  }
};

module.exports = imagemService;
