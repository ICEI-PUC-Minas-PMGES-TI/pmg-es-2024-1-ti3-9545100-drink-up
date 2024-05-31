const clienteService = require('../services/clienteService');
const Database = require("../models/Database");


const clienteController = {

  async criarCliente(req, res) {
    try {
      const { nome, cpf, dataNascimento, telefone, endereco, usuario } = req.body;

      const cliente = await clienteService.criarCliente(nome, cpf, dataNascimento, telefone, endereco, usuario);

      res.status(201).json(cliente);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      res.status(500).json({ message: 'Erro ao criar cliente' });
    }
  },
  
  async buscarClientePorCpf(req, res) {
    const cpf = req.params.cpf;
    try {
      const cliente = await clienteService.buscarClientePorCpf(cpf);
      res.json(cliente);
    } catch (error) {
      console.error('Erro ao buscar cliente por CPF:', error);
      res.status(500).json({ message: 'Erro ao buscar cliente por CPF' });
    }
  },

  async buscarClientePorId(req, res) {
    const id = req.params.id;
    try {
      const cliente = await clienteService.buscarClientePorId(id);
      res.json(cliente);
    } catch (error) {
      console.error('Erro ao buscar cliente por ID:', error);
      res.status(500).json({ message: 'Erro ao buscar cliente por ID' });
    }
  },

  async buscarClientePorIdUsuario(req, res) {
    const idUsuario = req.params.idUsuario;
    try {
      const cliente = await clienteService.buscarClientePorIdUsuario(idUsuario);
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      res.json(cliente);
    } catch (error) {
      console.error('Erro ao buscar cliente por ID de usuário:', error);
      res.status(500).json({ message: 'Erro ao buscar cliente por ID de usuário' });
    }
  },

  async listarTodosClientes(req, res) {
    try {
      const clientes = await clienteService.listarTodosClientes();
      res.json(clientes);
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      res.status(500).json({ message: 'Erro ao listar clientes' });
    }
  },

  async atualizarCliente(req, res) {
    const id = req.params.id;
    const { nome, dataNascimento, telefone, endereco } = req.body;
    try {
      const cliente = await clienteService.atualizarCliente(id, nome, dataNascimento, telefone, endereco);
      res.json(cliente);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      res.status(500).json({ message: 'Erro ao atualizar cliente' });
    }
  },

  async excluirCliente(req, res) {
    const id = req.params.id;
    try {
      await clienteService.excluirCliente(id);
      res.json({ message: 'Cliente excluído com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      res.status(500).json({ message: 'Erro ao excluir cliente' });
    }
  }
};

module.exports = clienteController;
