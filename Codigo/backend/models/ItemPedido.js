const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');
const Produto = require('./Produto');
const Pedido = require('./Pedido');


const sequelize = new Database(); // Cria uma nova instância de Database

class ItemPedido extends Model {}

ItemPedido.init(
  {
    data_criacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    valor_item: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    id_produto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produto,
        key: 'id'
      }
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
    modelName: 'ItemPedido',
    tableName: 'tb_item_pedido',
    timestamps: false
  }
);

module.exports = ItemPedido;