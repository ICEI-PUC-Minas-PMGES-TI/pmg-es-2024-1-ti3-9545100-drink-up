const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');
const Endereco = require('./Pedido');

const sequelize = new Database(); // Cria uma nova instância de Database


class Compras extends Model {}

Compras.init(
  {
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Pedido,
        key: 'id'
      }
    }
  },
  {
    sequelize: sequelize.getInstance(),
    modelName: 'Compras',
    tableName: 'tb_compras',
    timestamps: false
  }
);

module.exports = Compras;