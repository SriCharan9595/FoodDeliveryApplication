const {DataTypes} = require('sequelize');
const sqlconn = require('../config/sqldb')

const menuData = sqlconn.define('menuData',{
    
    category:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    hotelName:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    hotelMenu:{
        type: DataTypes.STRING,
        notEmpty: true
    },
    menuPrice:{
        type: DataTypes.INTEGER,
        notEmpty: true
    },
});

module.exports = menuData