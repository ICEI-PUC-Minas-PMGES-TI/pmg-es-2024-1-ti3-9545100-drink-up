const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const SECRET = 'drinkupTIS3';


async function criarUsuario(email, senha, perfil) {
  //Regex para validar email
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //Testando o email na validação regex
  if (!regexEmail.test(email)) {
    throw new Error('Email inválido');
  }
  try {
    const usuario = await Usuario.create({ email, senha, perfil });
    return usuario;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw new Error('Erro ao criar usuário');
  }
}

async function login(email, senha) {
  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    throw new Error('Usuário não encontrado');
  }

  if (usuario.senha !== senha) {
    throw new Error('Senha incorreta');
  }

  if (usuario.status !== '1') {
    throw new Error('Usuario inativo');
  }

  const token = jwt.sign({user_id:usuario.id, perfil:usuario.perfil, status:usuario.status, email:usuario.email}, SECRET);

  return {token};
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

async function atualizarUsuario(id, senha, status) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    // Verifica quais campos foram passados como parâmetro e atualiza somente esses campos

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

async function alterarSenha(id, senhaAtual, novaSenha) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
    // Verifica quais campos foram passados como parâmetro e atualiza somente esses campos

    if(usuario.senha == senhaAtual){

      usuario.senha = novaSenha;
      await usuario.save();
      return usuario;
    }
    else {
      throw new Error('Senha atual está incorreta');
    }

  } catch (error) {
    console.error('Senha atual está incorreta:', error);
    throw new Error('Senha atual está incorreta');
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
  alterarSenha,
  excluirUsuario,
  login
};