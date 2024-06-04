-- Active: 1710028842404@@127.0.0.1@3306@drink_up
/*============= EXECUTE O ARQUIVO OU TODOS OS COMANDOS MANUALMENTE EM ORDEM SEQUENCIAL ====================*/

/*CRIAÇÃO DA BASE DE DADOS*/
DROP DATABASE drink_up;

CREATE DATABASE drink_up;

/*ACESSO À BASE DE DADOS*/
USE drink_up;

/*INICIANDO A CRIAÇÃO DAS TABELAS QUE NÃO POSSUEM CHAVE ESTRANGEIRA*/

-- Criando a tabela tb_endereco, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_endereco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rua VARCHAR(255) NOT NULL,
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

desc tb_categoria;

-- Criando a tabela tb_imagem, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_imagem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(244) NOT NULL UNIQUE,
    caminho VARCHAR(244) NOT NULL
);

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
    email VARCHAR(244) NOT NULL UNIQUE,
    senha VARCHAR(244) NOT NULL,
    status ENUM('1', '2', '3') DEFAULT '1',
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    perfil ENUM('admin', 'cliente') NOT NULL
);

-- Criando a tabela tb_cliente, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(244) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(244) NOT NULL,
    id_usuario INT,
    id_endereco INT,
    FOREIGN KEY (id_usuario) REFERENCES tb_usuario (id),
    FOREIGN KEY (id_endereco) REFERENCES tb_endereco (id)
);

-- Criando a tabela tb_produto, verificando se a tabela já existe
CREATE TABLE IF NOT EXISTS tb_produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(244) NOT NULL UNIQUE,
    descricao TEXT,
    valor DECIMAL(10, 2) NOT NULL,
    tam_garrafa VARCHAR(244) NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    estoque_atual INT,
    id_imagem INT,
    id_categoria INT,
    FOREIGN KEY (id_imagem) REFERENCES tb_imagem (id),
    FOREIGN KEY (id_categoria) REFERENCES tb_categoria (id)
);

-- Criando a tabela tb_estoque, verificando se a tabela já existe previamente
CREATE TABLE IF NOT EXISTS tb_estoque (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_movimento DATETIME DEFAULT CURRENT_TIMESTAMP,
    quantidade INT NOT NULL,
    tipo ENUM('entrada', 'saida') NOT NULL,
    observacao TEXT,
    id_produto INT,
    FOREIGN KEY (id_produto) REFERENCES tb_produto (id)
);

CREATE TABLE tb_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    valor_pedido DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    id_frete INT NOT NULL,
    id_cliente INT NOT NULL,
    id_endereco INT NOT NULL,
    status_pedido ENUM('1', '2', '3') DEFAULT '1',
    CONSTRAINT fk_id_frete FOREIGN KEY (id_frete) REFERENCES tb_frete (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_id_cliente FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_id_endereco FOREIGN KEY (id_endereco) REFERENCES tb_endereco (id) ON DELETE CASCADE ON UPDATE CASCADE
);

Drop Table tb_pedido;

CREATE TABLE tb_item_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantidade int NOT NULL,
    data_criacao datetime not null,
    valor_item DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    id_produto INT NOT NULL,
    id_pedido INT NOT NULL,
    CONSTRAINT fk_id_produto FOREIGN KEY (id_produto) REFERENCES tb_produto (id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_id_pedido FOREIGN KEY (id_pedido) REFERENCES tb_pedido (id) ON DELETE CASCADE ON UPDATE CASCADE
);

Drop Table tb_item_pedido;

create table if not exists tb_frete (
    id INT AUTO_INCREMENT PRIMARY KEY,
    frete_fixo int not null,
    frete_gratis int not null
);

use drink_up;

/*SELECTS*/

SELECT * FROM tb_categoria;

SELECT * FROM tb_imagem;

SELECT * FROM tb_endereco;

SELECT * FROM tb_cliente;

SELECT * FROM tb_produto;

SELECT * FROM tb_usuario;

SELECT * FROM tb_estoque;

SELECT * FROM tb_frete;

SELECT * FROM tb_item_pedido;

SELECT * FROM tb_pedido;

/*INSERTS*/
INSERT INTO tb_categoria (descricao) VALUES ('cerveja');

INSERT INTO
    tb_usuario (email, senha, status, perfil)
VALUES (
        'sophia@email.com',
        '123',
        '1',
        'cliente'
    );

INSERT INTO
    tb_endereco (
        rua,
        numero,
        bairro,
        complemento,
        uf,
        cep
    )
VALUES (
        'Rua tals',
        122,
        'Bairro Exemplo',
        'Complemento Exemplo',
        'MG',
        '01237667'
    );

INSERT INTO
    tb_cliente (
        nome,
        cpf,
        data_nascimento,
        telefone,
        id_usuario,
        id_endereco
    )
VALUES (
        'Sophia',
        '123.452.789-10',
        '1990-01-01',
        '(11) 1564-5678',
        2,
        2
    );

INSERT INTO
    tb_produto (
        nome,
        descricao,
        valor,
        tam_garrafa,
        id_imagem,
        id_categoria
    )
VALUES (
        'Nome do Produto',
        'Descrição do Produto',
        10.99,
        'Tamanho da Garrafa',
        1,
        2
    );

/*Inserts para testar página de HOME, ESTOQUE E DETALHEPEDIDO*/

INSERT INTO
    tb_produto (
        nome,
        descricao,
        valor,
        tam_garrafa,
        estoque_atual,
        id_imagem,
        id_categoria
    )
VALUES (
        'Teste Teste Teste',
        'Descrição do Produto',
        10.99,
        'Tamanho da Garrafa',
        9,
        1,
        1
    );

INSERT INTO
    tb_produto (
        nome,
        descricao,
        valor,
        tam_garrafa,
        estoque_atual,
        id_imagem,
        id_categoria
    )
VALUES (
        'Coca Colaaaa',
        'Descrição do Produto',
        10.99,
        'Tamanho da Garrafa',
        9,
        1,
        1
    );

INSERT INTO
    tb_produto (
        nome,
        descricao,
        valor,
        tam_garrafa,
        estoque_atual,
        id_imagem,
        id_categoria
    )
VALUES (
        'Pepsiiiiii',
        'Descrição do Produto',
        10.99,
        'Tamanho da Garrafa',
        9,
        1,
        1
    );

INSERT INTO
    tb_produto (
        nome,
        descricao,
        valor,
        tam_garrafa,
        estoque_atual,
        id_imagem,
        id_categoria
    )
VALUES (
        'Guaranaaa',
        'Descrição do Produto',
        10.99,
        'Tamanho da Garrafa',
        9,
        1,
        1
    );

INSERT INTO tb_frete VALUES (1, 30, 300);