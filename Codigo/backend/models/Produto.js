const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');
const Imagem = require('./Imagem');
const Categoria = require('./Categoria');

class Produto extends Model {}

Produto.init(
  {
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    id_imagem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Imagem,
        key: 'id'
      }
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categoria,
        key: 'id'
      }
    }
  },
  {
    sequelize: Database.sequelize,
    modelName: 'Produto',
    tableName: 'tb_produto',
    timestamps: false
  }
);

module.exports = Produto;