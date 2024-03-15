const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Telefone extends Model {}

  Telefone.init({
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    telefone_adicional: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Telefone',
    tableName: 'tb_telefone',
    timestamps: false
  });

  return Telefone;
};
