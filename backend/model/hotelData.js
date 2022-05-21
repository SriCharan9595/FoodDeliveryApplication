const {DataTypes} = require('sequelize');
const sqlconn = require('../config/sqldb')

const hotelData = sqlconn.define('hoteldata',{
    
    category:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    hotelName:{
        type: DataTypes.STRING,
        notEmpty : true
    },
    area:{
        type: DataTypes.STRING,
        notEmpty: true
    },
    rating:{
        type: DataTypes.FLOAT,
        notEmpty: true
    },
    hotelUrl:{
        type: DataTypes.STRING,
        notEmpty: true
    }
});
module.exports = hotelData