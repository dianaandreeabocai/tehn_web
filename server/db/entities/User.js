const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const User= sequelize.define("User",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true,
    },
    password:Sequelize.STRING,
    role:Sequelize.STRING
});

module.exports=User;