const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Imagem extends Model {}

  Imagem.init({
    caminho: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Imagem',
    tableName: 'tb_imagem',
    timestamps: false
  });

  return Imagem;
};
