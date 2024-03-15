const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Endereco extends Model {}

  Endereco.init({
    logradouro: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bairro: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    complemento: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    uf: {
      type: DataTypes.CHAR(2),
      allowNull: false
    },
    cep: {
      type: DataTypes.STRING(8),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Endereco',
    tableName: 'tb_endereco',
    timestamps: false
  });

  return Endereco;
};
