const  Cliente   = require('../models/Cliente');
const  Endereco  = require('../models/Endereco');
const  Usuario = require('../services/usuarioService');


async function criarCliente(nome, cpf, dataNascimento, telefone, endereco, usuario) {
  try {
    const enderecoCriado = await Endereco.create(endereco);
    const usuarioCriado = await Usuario.criarUsuario(usuario.email, usuario.senha);

    const cliente = await Cliente.create({
      nome,
      cpf,
      data_nascimento: dataNascimento,
      telefone,
      id_endereco: enderecoCriado.id,
      id_usuario: usuarioCriado.id
    });

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

async function atualizarCliente(id, nome, cpf, dataNascimento, telefone, endereco) {
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }

    //Ajustando de acordo com os valores preenchidos no parâmetro
    if (nome) {
      cliente.nome = nome      
    }
    if (cpf) {
      cliente.cpf = cpf;
    }
    if (dataNascimento) {
      cliente.data_nascimento = dataNascimento;
    }
    if (telefone) {
      cliente.telefone = telefone;
    }

    const enderecoOk = await Endereco.findByPk(cliente.id_endereco);

    if (enderecoOk) {
      if (endereco.logradouro) {
        enderecoOk.logradouro = endereco.logradouro;
      }
      if (endereco.numero) {
        enderecoOk.numero = endereco.numero;
      }
      if (endereco.complemento) {
        enderecoOk.complemento = endereco.complemento;
      }
      if (endereco.bairro) {
        enderecoOk.bairro = endereco.bairro;
      }
      if (endereco.cidade) {
        enderecoOk.cidade = endereco.cidade;
      }
      if (endereco.cep) {
        enderecoOk.cep = endereco.cep;
      }
      if (endereco.uf) {
        enderecoOk.uf = endereco.uf;
      }
      await enderecoOk.save();
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