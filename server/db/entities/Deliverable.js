const Sequelize = require('sequelize');
const { sequelize } = require('../db');

const Deliverable=sequelize.define("Deliverable",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    dueDate: {
        type: Sequelize.STRING,
    },
    phase:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
module.exports=Deliverable;
