/*CRIAÇÃO DA BASE DE DADOS*/
CREATE DATABASE drink_up;

/*ACESSO À BASE DE DADOS*/
USE drink_up;

/*INICIANDO A CRIAÇÃO DAS TABELAS QUE NÃO POSSUEM CHAVE ESTRANGEIRA*/

-- Criando a tabela tb_categoria, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255) NOT NULL
);

-- Criando a tabela tb_imagem, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_imagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    caminho VARCHAR(255) NOT NULL
);

/* INICIANDO A CRIAÇÃO DAS TABELAS COM CHAVE ESTRANGEIRA, DE ACORDO COM A ORDEM DE DEPENDÊNCIA*/

-- Criando a tabela tb_cliente, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(191) NOT NULL ,
    rua VARCHAR(255) NOT NULL,
    numero INT NOT NULL,
    complemento VARCHAR(255),
    bairro VARCHAR(255) NOT NULL,
    cidade CHAR(2) NOT NULL,
    cep VARCHAR(8) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    senha VARCHAR(191) NOT NULL,
    confirmar_senha VARCHAR(191) NOT NULL
);

-- Criando a tabela tb_fornecedor, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_fornecedor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    identificador VARCHAR(20) NOT NULL,
    id_telefone INT,
    id_endereco INT,
    FOREIGN KEY (id_telefone) REFERENCES tb_telefone(id),
    FOREIGN KEY (id_endereco) REFERENCES tb_endereco(id)
);

-- Criando a tabela tb_produto, verificando se a tabela já existe
CREATE TABLE IF NOT EXISTS tb_produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(191) NOT NULL UNIQUE,
    descricao TEXT,
    valor DECIMAL(10, 2) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_imagem INT,
    id_categoria INT,
    FOREIGN KEY (id_imagem) REFERENCES tb_imagem(id),
    FOREIGN KEY (id_categoria) REFERENCES tb_categoria(id)
);