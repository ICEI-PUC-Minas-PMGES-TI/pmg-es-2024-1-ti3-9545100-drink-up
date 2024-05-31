const bcrypt = require('bcrypt');
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
  // Verificaa se a senha armazenada no banco de dados é criptografada
  const possuiCriptografia = usuario.senha.startsWith('$2b$');
  let senhaValida = false;

  if (possuiCriptografia) {
    // Tenta comparar a senha do parâmetro com a senha criptografada no banco de dados
    try {
      senhaValida = await bcrypt.compare(senha, usuario.senha);
    } catch (err) {
      console.error('Erro ao comparar a senha criptografada:', err);
      throw new Error('Erro ao verificar a senha');
    }
  } else {
    // Compara com a senha não criptografada no banco de dados. Para o caso de usuário criados anteriormente
    senhaValida = senha === usuario.senha;
  }

  if (!senhaValida) {
    throw new Error('Senha incorreta');
  }
  if (usuario.status !== '1') {
    throw new Error('Usuario inativo');
  }

  const token = jwt.sign({user_id:usuario.id, perfil:usuario.perfil, status:usuario.status, email:usuario.email}, SECRET, {expiresIn: '1h'});

  return { token };
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
      const salt = await bcrypt.genSalt(10);
      usuario.senha = await bcrypt.hash(senha, salt);
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

    const isMatch = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!isMatch) {
      throw new Error('Senha atual está incorreta');
    }

    const salt = await bcrypt.genSalt(10);
    usuario.senha = await bcrypt.hash(novaSenha, salt);
    await usuario.save();
    return usuario;

  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    throw new Error('Erro ao alterar senha');
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