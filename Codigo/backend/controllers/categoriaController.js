const categoriaService = require('../services/categoriaService');

const categoriaController = {
  async criarCategoria(req, res) {
    try {
      const { descricao } = req.body;

      const categoria = await categoriaService.criarCategoria(descricao);

      res.status(201).json(categoria);
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      res.status(500).json({ message: 'Erro ao criar categoria' });
    }
  },
  
  async buscarCategoriaPorId(req, res) {
    const id = req.params.id;
    try {
      const categoria = await categoriaService.buscarCategoriaPorId(id);
      res.json(categoria);
    } catch (error) {
      console.error('Erro ao buscar categoria por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar categoria por ID' });
    }
  },

  async listarTodasCategorias(req, res) {
    try {
      const categorias = await categoriaService.listarTodasCategorias();
      res.json(categorias);
    } catch (error) {
      console.error('Erro ao listar categorias:', error);
      res.status(500).json({ message: 'Erro ao listar categorias' });
    }
  },

  async atualizarCategoria(req, res) {
    const id = req.params.id;
    const { descricao } = req.body;
    try {
      const categoria = await categoriaService.atualizarCategoria(id, descricao);
      res.json(categoria);
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      res.status(500).json({ message: 'Erro ao atualizar categoria' });
    }
  },

  async excluirCategoria(req, res) {
    const id = req.params.id;
    try {
      await categoriaService.excluirCategoria(id);
      res.json({ message: 'Categoria excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      res.status(500).json({ message: 'Erro ao excluir categoria' });
    }
  }
};

module.exports = categoriaController;
