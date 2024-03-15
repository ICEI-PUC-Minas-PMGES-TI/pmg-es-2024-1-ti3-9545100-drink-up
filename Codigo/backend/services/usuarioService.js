const { Usuario } = require('../../models/models');

async function criarUsuario(nome, email, senha) {
  try {
    const usuario = await Usuario.create({ nome, email, senha });
    return usuario;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw new Error('Erro ao criar usuário');
  }
}

async function listarTodosUsuarios() {
  try {
    const usuarios = await Usuario.findAll();
    return usuarios;
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    throw new Error('Erro ao listar usuários');
  }
}


async function buscarUsuarioPorEmail(email) {
    try {
      const usuario = await Usuario.findOne({ where: { email } });
      return usuario;
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
      throw new Error('Erro ao buscar usuário por email');
    }
}


async function buscarUsuarioPorId(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      return usuario;
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      throw new Error('Erro ao buscar usuário por ID');
    }
}
  

async function atualizarUsuario(id, nome, senha, status) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
  
      // Verifica quais campos foram passados como parâmetro e atualiza somente esses campos
      if (nome) {
        usuario.nome = nome;
      }
      if (senha) {
        usuario.senha = senha;
      }
      if (status) {
        usuario.status = status;
      }
  
      await usuario.save();
      return usuario;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw new Error('Erro ao atualizar usuário');
    }
  }
  

async function excluirUsuario(id) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    await usuario.destroy();
    return true;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw new Error('Erro ao excluir usuário');
  }
}

module.exports = {
  criarUsuario,
  listarTodosUsuarios,
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  atualizarUsuario,
  excluirUsuario
};