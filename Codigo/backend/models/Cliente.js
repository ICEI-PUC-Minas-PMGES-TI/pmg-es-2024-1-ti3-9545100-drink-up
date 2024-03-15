const { Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Cliente extends Model {}

  Cliente.init({
    nome: DataTypes.STRING(255),
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
    data_nascimento: DataTypes.DATEONLY,
    ////// Atenção ---> quem modelar essa páigina, configure as chanves de acordo com a necessidade do cóigo ///
  }, {
    sequelize,
    modelName: 'Cliente',
    tableName: 'tb_cliente',
    timestamps: false,
  });

  Cliente.associate = (models) => {
    Cliente.belongsTo(models.Usuario, { foreignKey: 'id_usuario' });
    Cliente.belongsTo(models.Telefone, { foreignKey: 'id_telefone' });
    Cliente.belongsTo(models.Endereco, { foreignKey: 'id_endereco' });
  };

  return Cliente;
};
