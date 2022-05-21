const {DataTypes} = require('sequelize');
const sqlconn = require('../config/sqldb')

const orderData = sqlconn.define('orderdata',{
    
    foodieID:{
        type: DataTypes.INTEGER,
        notEmpty : true
    },
    foodieDetails:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    foodieAddress:{
        type: DataTypes.STRING,
        notEmpty: true
    },
    menuDetails:{
        type: DataTypes.INTEGER,
        notEmpty: true
    },
    finalBill:{
        type: DataTypes.INTEGER,
        notEmpty: true
    },
});

module.exports = orderData