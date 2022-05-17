const express = require('express')
const search = express.Router();
const foodieData = require('../model/foodieData')
const menuData = require('../model/menuData')
const app=express()
const bodyParser = require('body-parser');

const passport = require('passport');
require('../token/passport');

search.use(bodyParser.json())
search.use(express.json())

search.post('/:category',passport.authenticate('authToken', { session: false }), async(req,res) => {

    const menuDb = await menuData.findAll({ where: {category: req.params.category} });

    if(menuDb!=null)
        res.status(200).send(menuDb)
    else
        res.status(404).error(err)  

})

search.get('/:category/:hotelName', passport.authenticate('authToken', { session: false }), async(req,res) => {

    const menuDb = await menuData.findAll({ where: 
        {category: req.params.category, hotelName: req.params.hotelName} });

    if(menuDb!=null)
        res.status(200).send(menuDb)
    else
        res.status(404).error(err)  

})

search.post('/:category/:hotelName/:hotelMenu',passport.authenticate('authToken', { session: false }), async(req,res) => {

    const menuDb = await menuData.findAll({ where: 
        {category: req.params.category, hotelName: req.params.hotelName, hotelMenu:req.params.hotelMenu} });

    if(menuDb!=null)
        res.status(200).send(menuDb)
    else
        res.status(404).error(err)  

})

module.exports = search;


