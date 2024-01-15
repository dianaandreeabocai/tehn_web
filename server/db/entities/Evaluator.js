const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Evaluator=sequelize.define("Evaluator",{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    grade:{
        type:Sequelize.DECIMAL,
        allowNull:false
    }
});
module.exports=Evaluator;