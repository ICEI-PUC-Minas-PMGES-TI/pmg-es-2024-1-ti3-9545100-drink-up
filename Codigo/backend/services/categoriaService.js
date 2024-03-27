const Database = require("../models/Database");
const Categoria = require('../models/Categoria');

async function criarCategoria(descricao) {
  try {
    const categoria = await Categoria.create({ descricao });
    return categoria;
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw new Error('Erro ao criar categoria');
  }
}

async function buscarCategoriaPorId(id) {
  try {
    const categoria = await Categoria.findByPk(id);
    return categoria;
  } catch (error) {
    console.error('Erro ao buscar categoria por ID:', error);
    throw new Error('Erro ao buscar categoria por ID');
  }
}

async function listarTodasCategorias() {
  try {
    const categorias = await Categoria.findAll();
    return categorias;
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    throw new Error('Erro ao listar categorias');
  }
}

async function atualizarCategoria(id, descricao) {
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }
    categoria.descricao = descricao;
    await categoria.save();
    return categoria;
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    throw new Error('Erro ao atualizar categoria');
  }
}

async function excluirCategoria(id) {
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      throw new Error('Categoria não encontrada');
    }
    await categoria.destroy();
    return true;
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    throw new Error('Erro ao excluir categoria');
  }
}

module.exports = {
  criarCategoria,
  listarTodasCategorias,
  buscarCategoriaPorId,
  atualizarCategoria,
  excluirCategoria
};
