const axios = require('axios');

async function testarRequisicoes() {
  try {
    // Criar um usuário
    const novoUsuario = await axios.post('http://localhost:3000/usuarios', {
      nome: 'Joao Victor',
      email: 'joa@usuario.com',
      senha: '123456'
    });
    console.log('Novo usuário criado:', novoUsuario.data);

    // Listar todos os usuários
    const usuarios = await axios.get('http://localhost:3000/usuarios');
    console.log('Lista de usuários:', usuarios.data);

    // // Buscar um usuário pelo ID
    // const idUsuario = 1; // Altere o ID conforme necessário
    // const usuario = await axios.get(`http://localhost:3000/usuarios/${idUsuario}`);
    // console.log('Usuário encontrado:', usuario.data);

    // // // Atualizar um usuário pelo ID
    // const usuarioAtualizado = await axios.put(`http://localhost:3000/usuarios/${idUsuario}`, {
    //   nome: 'Novo Nome'
    // });
    // console.log('Usuário atualizado:', usuarioAtualizado.data);

    // // Excluir um usuário pelo ID
  //   await axios.delete(`http://localhost:3000/usuarios/${idUsuario}`);
  //   console.log('Usuário excluído com sucesso');
  } catch (error) {
    console.error('Erro ao testar requisições:', error.response.data);
  }
}


testarRequisicoes();
