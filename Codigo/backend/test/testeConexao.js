const Sequelize = require("sequelize");
const sequelize = new Sequelize("drink_up", "drinkup_master", "drinkup", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate().then(function() {
    console.log("Conectado com suscesso");
}).catch(function(erro){
    console.log("Erro ao conectar: " + erro);
})


