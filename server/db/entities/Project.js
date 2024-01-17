const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Project=sequelize.define("Project",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    description: {
        type:Sequelize.STRING,
        allowNull:false
    },
    videoUrl: {
        type:Sequelize.STRING
    },
    externalUrl: {
        type:Sequelize.STRING,
        allowNull:false
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    }

});
module.exports=Project;
