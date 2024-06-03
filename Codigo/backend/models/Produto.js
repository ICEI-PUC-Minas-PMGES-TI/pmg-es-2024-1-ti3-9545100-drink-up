const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');
const Imagem = require('./Imagem');
const Categoria = require('./Categoria');

const sequelize = new Database(); 

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
    tam_garrafa: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    estoque_atual: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    id_imagem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Imagem,
        key: 'id'
      }
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Categoria,
        key: 'id'
      }
    }
  },
  {
    sequelize: sequelize.getInstance(),
    modelName: 'Produto',
    tableName: 'tb_produto',
    timestamps: false
  }
);

Produto.belongsTo(Imagem, { foreignKey: 'id_imagem', as: 'imagem' });

module.exports = Produto;
