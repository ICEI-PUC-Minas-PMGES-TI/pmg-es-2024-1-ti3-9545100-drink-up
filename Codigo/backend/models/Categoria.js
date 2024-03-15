const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Categoria extends Model {}

  Categoria.init({
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },{
    sequelize,
    modelName: 'Categoria',
    tableName: 'tb_categoria',
    timestamps: false
  }
  );

  return Categoria;
};
