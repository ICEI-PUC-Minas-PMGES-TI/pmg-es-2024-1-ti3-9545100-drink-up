/*============= EXECUTE O ARQUIVO OU TODOS OS COMANDOS MANUALMENTE EM ORDEM SEQUENCIAL ====================*/

/*CRIAÇÃO DE UM USUARIO MASTER COM PRIVILEGIOS*/
CREATE USER 'drinkup_master'@'localhost' IDENTIFIED BY 'drinkup';
GRANT ALL PRIVILEGES ON *.* TO 'drinkup_master'@'localhost' WITH GRANT OPTION;

/*CRIACAO DA BASE DE DADOS*/
CREATE DATABASE drink_up;

/*ACESSO A BASE DE DADOS*/
USE drink_up;

/*INICIANDO A CRIAÇÃO DAS TABELAS QUE NAO POSSUEM CHAVE ESTRANGEIRA*/

/*ENDERECO*/

DROP TABLE IF EXISTS `tb_endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_endereco` (
  `id` int NOT NULL AUTO_INCREMENT,
  `rua` varchar(255) NOT NULL,
  `numero` int NOT NULL,
  `bairro` varchar(255) NOT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `uf` char(2) NOT NULL,
  `cep` varchar(8) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*CATEGORIA*/

DROP TABLE IF EXISTS `tb_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_categoria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*IMAGEM*/

DROP TABLE IF EXISTS `tb_imagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_imagem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(244) NOT NULL,
  `caminho` varchar(244) NOT NULL,
  PRIMARY KEY (`id`),
 /*============= EXECUTE O ARQUIVO OU TODOS OS COMANDOS MANUALMENTE EM ORDEM SEQUENCIAL ====================*/

/*CRIAÇÃO DE UM USUÁRIO MASTER COM PRIVILÉGIOS*/
CREATE USER 'drinkup_master'@'localhost' IDENTIFIED BY 'drinkup';
GRANT ALL PRIVILEGES ON *.* TO 'drinkup_master'@'localhost' WITH GRANT OPTION;

/*CRIAÇÃO DA BASE DE DADOS*/
CREATE DATABASE drink_up;

/*ACESSO À BASE DE DADOS*/
USE drink_up; UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


/* INICIANDO A CRIAÇÃO DAS TABELAS COM CHAVE ESTRANGEIRA, DE ACORDO COM A ORDEM DE DEPENDÊNCIA*/

/*USUARIO*/

/*
A coluna status possui três opções de valores:
1 -> Usuário está ativo
2 -> Usário está inativo/bloqueado
3 -> Usuário está caracterizado como excluído das rotinas no sistema, 
porém seu registro será mantido no banco para rastreabilidade e integridade da informação
*/
DROP TABLE IF EXISTS `tb_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(244) NOT NULL,
  `senha` varchar(244) NOT NULL,
  `status` enum('1','2','3') DEFAULT '1',
  `data_criacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `perfil` enum('admin','cliente') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


/*CLIENTE*/

DROP TABLE IF EXISTS `tb_cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_cliente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(244) NOT NULL,
  `cpf` varchar(14) NOT NULL,
  `data_nascimento` date NOT NULL,
  `telefone` varchar(244) NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_endereco` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf` (`cpf`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_endereco` (`id_endereco`),
  CONSTRAINT `tb_cliente_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuario` (`id`),
  CONSTRAINT `tb_cliente_ibfk_2` FOREIGN KEY (`id_endereco`) REFERENCES `tb_endereco` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*PRODUTO*/

DROP TABLE IF EXISTS `tb_produto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_produto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(244) NOT NULL,
  `descricao` text,
  `valor` decimal(10,2) NOT NULL,
  `tam_garrafa` varchar(244) NOT NULL,
  `data_criacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `estoque_atual` int DEFAULT NULL,
  `id_imagem` int DEFAULT NULL,
  `id_categoria` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`),
  KEY `id_imagem` (`id_imagem`),
  KEY `id_categoria` (`id_categoria`),
  CONSTRAINT `tb_produto_ibfk_1` FOREIGN KEY (`id_imagem`) REFERENCES `tb_imagem` (`id`),
  CONSTRAINT `tb_produto_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `tb_categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


/*ESTOQUE*/

DROP TABLE IF EXISTS `tb_estoque`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_estoque` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_movimento` datetime DEFAULT CURRENT_TIMESTAMP,
  `quantidade` int NOT NULL,
  `tipo` enum('entrada','saida') NOT NULL,
  `observacao` text,
  `id_produto` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_produto` (`id_produto`),
  CONSTRAINT `tb_estoque_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `tb_produto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


/*FRETE*/

DROP TABLE IF EXISTS `tb_frete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_frete` (
  `id` int NOT NULL AUTO_INCREMENT,
  `frete_fixo` int NOT NULL,
  `frete_gratis` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*PEDIDO*/

DROP TABLE IF EXISTS `tb_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `data_criacao` datetime DEFAULT CURRENT_TIMESTAMP,
  `valor_pedido` decimal(10,2) NOT NULL DEFAULT '0.00',
  `id_frete` int NOT NULL,
  `id_cliente` int NOT NULL,
  `id_endereco` int NOT NULL,
  `status_pedido` enum('1','2','3') DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_id_frete` (`id_frete`),
  KEY `fk_id_cliente` (`id_cliente`),
  KEY `fk_id_endereco` (`id_endereco`),
  CONSTRAINT `fk_id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `tb_cliente` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_id_endereco` FOREIGN KEY (`id_endereco`) REFERENCES `tb_endereco` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_id_frete` FOREIGN KEY (`id_frete`) REFERENCES `tb_frete` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


/*ITENS DO PEDIDO*/

DROP TABLE IF EXISTS `tb_item_pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_item_pedido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantidade` int NOT NULL,
  `data_criacao` datetime NOT NULL,
  `valor_item` decimal(10,2) NOT NULL DEFAULT '0.00',
  `id_produto` int NOT NULL,
  `id_pedido` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_produto` (`id_produto`),
  KEY `fk_id_pedido` (`id_pedido`),
  CONSTRAINT `fk_id_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `tb_pedido` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_id_produto` FOREIGN KEY (`id_produto`) REFERENCES `tb_produto` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

