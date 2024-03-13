const { Cliente } = require('../../models/models');

async function criarCliente(nome, cpf, dataNascimento, idUsuario, idTelefone, idEndereco) {
  try {
    const cliente = await Cliente.create({ nome, cpf, data_nascimento: dataNascimento, id_usuario: idUsuario, id_telefone: idTelefone, id_endereco: idEndereco });
    return cliente;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw new Error('Erro ao criar cliente');
  }
}

async function buscarClientePorCpf(cpf) {
    try {
      const cliente = await Cliente.findOne({ where: { cpf } });
      return cliente;
    } catch (error) {
      console.error('Erro ao buscar cliente por CPF:', error);
      throw new Error('Erro ao buscar cliente por CPF');
    }
}
  
async function buscarClientePorId(id) {
    try {
       const cliente = await Cliente.findByPk(id);
       return cliente;
    } catch (error) {
       console.error('Erro ao buscar cliente por ID:', error);
       throw new Error('Erro ao buscar cliente por ID');
    }
}
  

async function listarTodosClientes() {
    try {
        const clientes = await Cliente.findAll();
        return clientes;
    } catch (error) {
        console.error('Erro ao listar clientes:', error);
        throw new Error('Erro ao listar clientes');
    }
}

async function atualizarCliente(id, nome, cpf, dataNascimento, idTelefone, idEndereco) {
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    cliente.nome = nome;
    cliente.cpf = cpf;
    cliente.data_nascimento = dataNascimento;
    cliente.id_telefone = idTelefone;
    cliente.id_endereco = idEndereco;

    await cliente.save();
    return cliente;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw new Error('Erro ao atualizar cliente');
  }
}

async function excluirCliente(id) {
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    await cliente.destroy();
    return true;
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    throw new Error('Erro ao excluir cliente');
  }
}

module.exports = {
  criarCliente,
  listarTodosClientes,
  buscarClientePorCpf,
  buscarClientePorId,
  atualizarCliente,
  excluirCliente
};