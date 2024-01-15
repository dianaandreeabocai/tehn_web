const Sequelize = require("sequelize"); 

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: './db/database.sqlite',
    logging: true
})

const syncDB = async () => {
    await sequelize.sync();
    console.log('DB is ready');
}

try {
   syncDB();
}
catch(err) {
    console.log(err);
}


module.exports = {sequelize};