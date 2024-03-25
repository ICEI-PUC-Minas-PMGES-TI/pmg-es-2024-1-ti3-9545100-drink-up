const { Model, DataTypes } = require('sequelize');
const Database = require('./Database');

const sequelize = new Database();

class Categoria extends Model {}

Categoria.init(
  {
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },
  {
    sequelize: sequelize.getInstance(),
    modelName: 'Categoria',
    tableName: 'tb_categoria',
    timestamps: false
  }
);

module.exports = Categoria;