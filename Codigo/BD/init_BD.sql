/*============= EXECUTE O ARQUIVO OU TODOS OS COMANDOS MANUALMENTE EM ORDEM SEQUENCIAL ====================*/


/*CRIAÇÃO DE UM USUÁRIO MASTER COM PRIVILÉGIOS*/
CREATE USER 'drinkup_master'@'localhost' IDENTIFIED BY 'drinkup';
GRANT ALL PRIVILEGES ON *.* TO 'drinkup_master'@'localhost' WITH GRANT OPTION;

/*CRIAÇÃO DA BASE DE DADOS*/
CREATE DATABASE drink_up;

/*ACESSO À BASE DE DADOS*/
USE drink_up;

/*INICIANDO A CRIAÇÃO DAS TABELAS QUE NÃO POSSUEM CHAVE ESTRANGEIRA*/

-- Criando a tabela tb_telefone, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_telefone (
    id INT AUTO_INCREMENT PRIMARY KEY,
    telefone VARCHAR(20) NOT NULL,
    telefone_adicional VARCHAR(20)
);


-- Criando a tabela tb_endereco, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_endereco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logradouro VARCHAR(255) NOT NULL,
    numero INT NOT NULL,
    bairro VARCHAR(255) NOT NULL,
    complemento VARCHAR(255),
    uf CHAR(2) NOT NULL,
    cep VARCHAR(8) NOT NULL
);


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

-- Segue também opção para tb_imagem utilizando um campo blob
/*
CREATE TABLE IF NOT EXISTS tb_imagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    imagem BLOB NOT NULL
);
*/


/* INICIANDO A CRIAÇÃO DAS TABELAS COM CHAVE ESTRANGEIRA, DE ACORDO COM A ORDEM DE DEPENDÊNCIA*/

-- Criando a tabela tb_usuario, verificando se a tabela já existe previamente
/*
A coluna status possui três opções de valores:
1 -> Usuário está ativo
2 -> Usário está inativo/bloqueado
3 -> Usuário está caracterizado como excluído das rotinas no sistema, 
    porém seu registro será mantido no banco para rastreabilidade e integridade da informação
*/
CREATE TABLE IF NOT EXISTS tb_usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    status ENUM('1', '2', '3') DEFAULT '1',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
);


-- Criando a tabela tb_cliente, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    id_usuario INT,
    id_telefone INT,
    id_endereco INT,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario(id),
    FOREIGN KEY (id_telefone) REFERENCES tb_telefone(id),
    FOREIGN KEY (id_endereco) REFERENCES tb_endereco(id)
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


-- Criando a tabela tb_produto, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    descricao TEXT,
    valor DECIMAL(10, 2) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    id_imagem INT,
    id_categoria INT,
    FOREIGN KEY (id_imagem) REFERENCES tb_imagem(id),
    FOREIGN KEY (id_categoria) REFERENCES tb_categoria(id)
);


--Inserts