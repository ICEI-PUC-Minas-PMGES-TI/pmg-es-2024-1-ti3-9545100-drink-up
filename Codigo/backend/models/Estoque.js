const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');
const Produto = require('./Produto');

const sequelize = new Database(); // Cria uma nova instância de Database

class Estoque extends Model {}

Estoque.init(
  {
    data_movimento: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM('entrada', 'saida'),
      allowNull: false
    },
    observacao: {
      type: DataTypes.TEXT
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produto,
        key: 'id'
      }
    }
  },
  {
    sequelize: sequelize.getInstance(),
    modelName: 'Estoque',
    tableName: 'tb_estoque',
    timestamps: false
  }
);

module.exports = Estoque;
