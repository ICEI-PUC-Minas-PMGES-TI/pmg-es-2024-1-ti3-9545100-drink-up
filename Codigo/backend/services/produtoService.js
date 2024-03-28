const Database = require("../models/Database");
const Produto = require("../models/Produto");
const Imagem = require("../models/Imagem");
const categoriaService = require('./categoriaService');

async function criarProduto(nome, descricao, valor, tamGarrafa, idImagem, idCategoria) {

  console.log({nome, descricao, valor, tamGarrafa, idImagem, idCategoria});
  let transaction;
  
  try {
    const db = new Database();
    const sequelize = db.getInstance();
    transaction = await sequelize.transaction();

    // Verifica se a imagem e a categoria existem antes de criar o produto
    //await verificarExistenciaImagem(idImagem); quando resolver o bo das imagens
    await verificarExistenciaCategoria(idCategoria);

    const produto = await Produto.create({
      nome,
      descricao,
      valor,
      tam_garrafa: tamGarrafa,
      id_imagem: null, //idImagem,
      id_categoria: parseInt(idCategoria)
    }, { transaction });

    await transaction.commit();
    return produto;
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error('Erro ao criar produto:', error);
    throw new Error('Erro ao criar produto');
  }
}

async function verificarExistenciaImagem(idImagem) {
  if (idImagem) {
    const imagem = await Imagem.findByPk(idImagem);
    if (!imagem) {
      throw new Error('Imagem não encontrada');
    }
  }
}

async function verificarExistenciaCategoria(idCategoria) {
  if (idCategoria) {
    const categoria = await categoriaService.buscarCategoriaPorId(idCategoria);
    return categoria;
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }
  }
}

async function buscarProdutoPorNome(nome) {
  try {
    const produto = await Produto.findOne({ where: { nome } });
    return produto;
  } catch (error) {
    console.error('Erro ao buscar produto por nome:', error);
    throw new Error('Erro ao buscar produto por nome');
  }
}

async function buscarProdutoPorId(id) {
  try {
    const produto = await Produto.findByPk(id);
    return produto;
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    throw new Error('Erro ao buscar produto por ID');
  }
}

async function listarTodosProdutos() {
  try {
    const produtos = await Produto.findAll();

    for (const product of produtos) {
      product.id_categoria = await categoriaService.buscarCategoriaPorId(parseInt(product.id_categoria));
    }

    return produtos;
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    throw new Error('Erro ao listar produtos');
  }
}

async function atualizarProduto(id, nome, descricao, valor, tamGarrafa, idImagem, idCategoria) {
  console.log({id, nome, descricao, valor, tamGarrafa, idImagem, idCategoria})
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    // Atualiza somente os campos preenchidos por parâmetro
    if (nome) {
      produto.nome = nome;
    }
    if (descricao) {
      produto.descricao = descricao;
    }
    if (valor) {
      produto.valor = valor;
    }
    if (tamGarrafa) {
      produto.tam_garrafa = tamGarrafa;
    }
    if (idImagem) {
      await verificarExistenciaImagem(idImagem);
      produto.id_imagem = idImagem;
    }
    if (idCategoria) {
      await verificarExistenciaCategoria(idCategoria);
      produto.id_categoria = idCategoria;
    }

    await produto.save();
    return produto;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw new Error('Erro ao atualizar produto');
  }
}

async function excluirProduto(id) {
  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    await produto.destroy();
    return true;
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    throw new Error('Erro ao excluir produto');
  }
}

module.exports = {
  criarProduto,
  listarTodosProdutos,
  buscarProdutoPorNome,
  buscarProdutoPorId,
  atualizarProduto,
  excluirProduto
};
