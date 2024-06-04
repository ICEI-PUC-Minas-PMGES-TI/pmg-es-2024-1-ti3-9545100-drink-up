const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');
const Endereco = require('./Endereco');
const Frete = require('./Frete');
const Cliente = require('./Cliente')

const sequelize = new Database(); // Cria uma nova instância de Database


class Pedido extends Model {}

Pedido.init(
  {
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    valor_pedido: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
      defaultValue: 0.00
    },
    id_frete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Frete,
        key: 'id'
      }
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: 'id'
      }
    },
    id_endereco: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Endereco,
        key: 'id'
      }
    },
    status_pedido: {
      type: DataTypes.ENUM('1', '2', '3', '4'),
      defaultValue: '1'
    }
  },
  {
    sequelize: sequelize.getInstance(),
    modelName: 'Pedido',
    tableName: 'tb_pedido',
    timestamps: false
  }
);

module.exports = Pedido;