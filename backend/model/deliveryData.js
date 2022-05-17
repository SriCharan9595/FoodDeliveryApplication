const {DataTypes} = require('sequelize');
const sqlconn = require('../config/sqldb');

const deliveryData= sqlconn.define('deliverydata',{

    foodieID: {
        type: DataTypes.INTEGER,
        notEmpty: true
    },
    doorNo: {
        type: DataTypes.STRING,
        notEmpty: true
    },
    street: {
        type: DataTypes.STRING,
        notEmpty: true
    },
    area: {
        type: DataTypes.STRING,
        notEmpty: true
    },
    district: {
        type: DataTypes.STRING,
        notEmpty: true
    },
    pincode: {
        type: DataTypes.INTEGER,
        notEmpty: true
    }    
    
})

module.exports = deliveryData