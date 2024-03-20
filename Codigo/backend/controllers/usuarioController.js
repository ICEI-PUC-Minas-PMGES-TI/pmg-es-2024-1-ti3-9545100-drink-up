const usuarioService = require('../services/usuarioService');

const usuarioController = {
  
  async criarUsuario(req, res) {
    const { email, senha, perfil } = req.body;
    try {
      const usuario = await usuarioService.criarUsuario(email, senha, perfil);
      res.status(201).json(usuario);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(500).json({ error: 'Erro ao criar usuário ' + error});
    }
  },

  async listarTodosUsuarios(req, res) {
    try {
      const usuarios = await usuarioService.listarTodosUsuarios();
      res.json(usuarios);
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      res.status(500).json({ error: 'Erro ao listar usuários ' + error});
    }
  },

  async buscarUsuarioPorEmail(req, res) {
    const { email } = req.params;
    try {
      const usuario = await usuarioService.buscarUsuarioPorEmail(email);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      res.status(500).json({ error: 'Erro ao buscar usuário por email ' + error});
    }
  },

  async buscarUsuarioPorId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await usuarioService.buscarUsuarioPorId(id);
      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      res.status(500).json({ error: 'Erro ao buscar usuário por ID ' + error});
    }
  },

  async atualizarUsuario(req, res) {
    const { id } = req.params;
    const { senha, status } = req.body;
    try {
      const usuario = await usuarioService.atualizarUsuario(id, senha, status);
      res.json(usuario);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro ao atualizar usuário ' + error});
    }
  },

  async excluirUsuario(req, res) {
    const { id } = req.params;
    try {
      await usuarioService.excluirUsuario(id);
      res.status(204).end();
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
      res.status(500).json({ error: 'Erro ao excluir usuário ' + error});
    }
  }
};

module.exports = usuarioController;
