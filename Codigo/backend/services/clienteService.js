const Database = require("../models/Database");
const  Cliente   = require('../models/Cliente');
const  Endereco  = require('../models/Endereco');
const  Usuario = require('../services/usuarioService');


async function criarCliente(nome, cpf, dataNascimento, telefone, endereco, usuario) {
  let transaction;
  let usuarioCriado;
  try {
    //Inicia uma transação passível de rollback
    const db = new Database();
    const sequelize = db.getInstance();
    transaction = await sequelize.transaction();
    
    //Cria o endereço dentro da transação
    const enderecoCriado = await Endereco.create(endereco, { transaction });

    // Cria o usuário dentro da transação
    usuarioCriado = await Usuario.criarUsuario(usuario.email, usuario.senha, "cliente", { transaction });

    // Cria o cliente usando os IDs do usuário e endereço criados
    const cliente = await Cliente.create({
      nome,
      cpf,
      data_nascimento: dataNascimento,
      telefone,
      id_endereco: enderecoCriado.id,
      id_usuario: usuarioCriado.id
    }, { transaction });

    // Se tudo ocorreu bem, faz o commit da transação
    await transaction.commit();

    return cliente;
  } catch (error) {
    // Em caso de erro, faz o rollback da transação
    if (transaction) await transaction.rollback();

    // Se houver erro no cliente, destrua o usuário criado
    if (usuarioCriado) await Usuario.excluirUsuario(usuarioCriado.id);

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

async function atualizarCliente(id, nome, dataNascimento, telefone, endereco_param) {
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    // Atualiza somente os campos de cliente preenchidos por parâmetro
    if (nome) {
      cliente.nome = nome      
    }
    if (dataNascimento) {
      cliente.data_nascimento = dataNascimento;
    }
    if (telefone) {
      cliente.telefone = telefone;
    }

    const endereco = await Endereco.findByPk(cliente.id_endereco);

    if (endereco) {
      // Atualiza somente os campos de endereço preenchidos por parâmetro
      for (const key in endereco_param) {
        if (Object.hasOwnProperty.call(endereco_param, key)) {
          endereco[key] = endereco_param[key];
        }
      }
      await endereco.save();
    }

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