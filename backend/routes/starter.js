const express = require('express')
const admin = require('../routes/admin')
const search = require('../routes/search')
const foodieData = require('../model/foodieData')
const deliveryData = require('../model/deliveryData')
const hotelData = require('../model/hotelData')
const menuData = require('../model/menuData')
const bcrypt = require('bcrypt')
const tokenBuilder = require('../token/tokenBuilder')
const jwt = require('jsonwebtoken')
const app=express()
const bodyParser = require('body-parser')
const cors = require('cors')


const passport = require('passport');
require('../token/passport');

app.use(cors())
app.use(bodyParser.json())
app.use(express.json())

require('dotenv').config()


app.use('/admin',admin)

app.get('/', (req,res)=>{
    res.send('Welcome to Foodiez Spot')
})

app.post('/token', passport.authenticate('refreshtoken', { session: false }), async (req, res) => {

    refreshTokenFromHeader = req.headers.authorization.split(' ')[1];

    const isTokenExist = await token_model.findOne({ where: { refreshToken: refreshTokenFromHeader } }) ? true : false;

    if (isTokenExist) {
        const access_token = jwtTokenGenerator.genAccessToken(req.user.sub)
        res.status(201).json({ access_token: access_token })
    } else {
        res.status(404).json({"message":"Token not found!"})
    }
})

app.post('/register', async (req,res) => {

    let {username, phoneNo, mailId, password} = req.body;
    
    phoneNo=parseInt(phoneNo)

    const checkphoneNo = (await foodieData.findOne({ where: {phoneNo: phoneNo} }))? true:false;
    const checkmailId = (await foodieData.findOne({ where: {mailId: mailId} }))? true:false;

    if(checkphoneNo || checkmailId) {
        res.status(209).send("User already exists !") }
    else { 
        const hashedPswd = await bcrypt.hash(password, 10);
        const finalData = await foodieData.create({username:username, phoneNo:phoneNo, 
            mailId:mailId, password:hashedPswd});
        res.status(200).json({"message":"Registered successfully... with foodieID: "+finalData.id});
    } 
})

app.get('/findFoodie/:mailId', async(req,res) => {
    const findFoodie = await foodieData.findOne({ where: {mailId: req.params.mailId} });
    if(findFoodie!=null) {
        res.status(200).send(findFoodie)
        console.log(findFoodie)
    }
})

app.get('/findAddress/:foodieID', async(req,res) => {
    const findAddress = await deliveryData.findOne({ where: {foodieID: req.params.foodieID} });
    if(findAddress!=null) {
        res.status(200).send(findAddress)
        console.log(findAddress)
    }
})

app.post('/login', async(req,res) => { 
    const {mailId, password}= req.body;
    const userFound = await foodieData.findOne({where: {mailId: mailId}});
    if(userFound!=null) {
        bcrypt.compare(password, userFound.password).then(existUser => {
            if(existUser) {
                res.status(200).send({accessToken: tokenBuilder.authToken(userFound)}) 
                // res.status(200).send({refreshToken: tokenBuilder.refreshToken(userFound)})
            }    
            else
                res.status(404).send('User not found !')    
        })
    }
    else{
        res.status(404).send('User not found !')
    }
})

app.post('/addAddress', async(req,res) => {
    const {foodieID, doorNo, street, area, district, pincode} = req.body;
    const addAddress = await deliveryData.create({foodieID:foodieID,doorNo:doorNo, street:street, 
        area:area, district:district, pincode:pincode});
    res.status(200).json({"message":"Address added successfully... with addressId: "+addAddress.id}); 
})

app.get('/hotelData/:category', passport.authenticate('authToken', { session: false }), async (req,res) => {
    // const {category} = req.body;
    const dispHotel = await hotelData.findAll({ where: {category: req.params.category} });
    if(dispHotel!=null) {
        res.status(200).send(dispHotel)
        console.log(dispHotel)
    }
    else
        res.status(400).send('Something went wrong')    
})

app.use('/search',search)

app.listen(9000,()=>{
    console.log('Server running in port 9000')
})
