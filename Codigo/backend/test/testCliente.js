const axios = require('axios');

// Dados do cliente a serem enviados na requisição
const clienteData = {
  nome: 'Fulano de Tal',
  cpf: '123.456.789-00',
  dataNascimento: '1990-01-01',
  telefone: '99999-9999',
  endereco: {
    rua: 'Rua das Flores',
    numero: '123',
    complemento: 'Apto 101',
    bairro: 'Centro',
    cidade: 'São Paulo',
    cep: '12345-678'
  },
  usuario: {
    email: 'fulano@example.com',
    senha: 'senha123'
  }
};

// URL da sua API para criar um cliente
const url = 'http://localhost:3000/cliente';

// Envia a requisição POST usando o Axios
axios.post(url, clienteData)
  .then(response => {
    console.log('Cliente criado com sucesso:', response.data);
  })
  .catch(error => {
    console.error('Erro ao criar cliente:', error.response.data);
  });
