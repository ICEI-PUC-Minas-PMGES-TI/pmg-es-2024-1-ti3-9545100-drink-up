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
    const senhaCriptografada = await criptografarSenha(senha);
    const usuario = await Usuario.create({ email, senha: senhaCriptografada, perfil });
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
  
  const senhaValida = await verificaSenha(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error('Senha incorreta');
  }
  
  if (usuario.status !== '1') {
    throw new Error('Usuario inativo');
  }

  const token = jwt.sign(
    { 
      user_id:usuario.id, 
      perfil:usuario.perfil, 
      status:usuario.status, 
      email:usuario.email 
    }, 
    SECRET, {expiresIn: '3h'}
  );

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
      const senhaCriptografada = await criptografarSenha(senha);
      usuario.senha = senhaCriptografada;
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

    const senhaValida = await verificaSenha(senhaAtual, usuario.senha);

    if (!senhaValida) {
      throw new Error('Senha incorreta');
    }

    const senhaCriptografada = await criptografarSenha(novaSenha);
    usuario.senha = senhaCriptografada;

    await usuario.save();
    return usuario;

  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    throw new Error('Erro ao alterar senha');
  }
}


//Metodo para exclusão simbólica do usuário, removendo o status e colocado uma senha segura padrao 
// Senha padrão: "dXN1YXJpbyBleGNsdWlkbyBjb20gc3VjZXNzbw==" -> formatação base64 para "usuario excluido com sucesso"
async function excluirUsuario(id) {
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    usuario.senha = "dXN1YXJpbyBleGNsdWlkbyBjb20gc3VjZXNzbw==";
    usuario.status = 3;

    await usuario.save();

    return true;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw new Error('Erro ao excluir usuário');
  }
}

async function criptografarSenha(senha) {
  const salt = await bcrypt.genSalt(10);
  const senhaCriptografada = await bcrypt.hash(senha, salt);
  return senhaCriptografada;
}

async function verificaSenha(senhaEntrada, senhaUsuario) {

  let senhaValida = false;
  // Verificaa se a senha armazenada no banco de dados é criptografada
  if (senhaUsuario.startsWith('$2b$')) {
    // Compara a senha do parâmetro com a senha criptografada no banco de dados
    senhaValida = await bcrypt.compare(senhaEntrada, senhaUsuario);
  } else {
    // Compara com a senha não criptografada no banco de dados. Para o caso de usuário criados anteriormente à criptografia
    senhaValida = senhaEntrada === senhaUsuario;
  }
  
  return senhaValida;
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