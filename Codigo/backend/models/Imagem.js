const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Imagem extends Model {}

  Imagem.init({
    caminho: {
      type: DataTypes.STRING(255),
      allowNull: false // --->>> dependendo do estágio do sistema Allow null, podendo ignorar imagem.
    }
  }, {
    sequelize,
    modelName: 'Imagem',
    tableName: 'tb_imagem',
    timestamps: false
  });

  return Imagem;
};
