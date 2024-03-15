const Sequelize = require('sequelize');
const sequelize = new Sequelize('drink_up', 'drinkup_master', 'drinkup', { host: 'localhost', dialect: 'mysql' });

const models = {
  Usuario: require('./Usuario')(sequelize, Sequelize.DataTypes),
  Cliente: require('./Cliente')(sequelize, Sequelize.DataTypes),
  Telefone: require('./Telefone')(sequelize, Sequelize.DataTypes),
  Endereco: require('./Endereco')(sequelize, Sequelize.DataTypes),
  Produto: require('./Produto')(sequelize, Sequelize.DataTypes),
  Imagem: require('./Imagem')(sequelize, Sequelize.DataTypes),
  
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
