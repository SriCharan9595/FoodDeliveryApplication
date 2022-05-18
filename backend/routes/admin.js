const express = require('express')
const admin = express.Router();
const foodieData = require('../model/foodieData')
const adminData = require('../model/adminData')
const hotelData = require('../model/hotelData')
const bcrypt = require('bcrypt')
const app = express()
const bodyParser = require('body-parser')
const tokenBuilder = require('../token/tokenBuilder')
const jwt = require('jsonwebtoken')
const cors = require('cors')


const passport = require('passport');
const deliveryData = require('../model/deliveryData');
require('../token/passport');
app.use(cors())


admin.use(bodyParser.json())
admin.use(express.json())


admin.post('/register', async (req, res) => {

    let { mailId, password } = req.body;
    const checkmailId = (await adminData.findOne({ where: { mailId: mailId } })) ? true : false;

    if (checkmailId) {
        res.status(209).send("User already exists !")
    }
    else {
        const hashedPswd = await bcrypt.hash(password, 10);
        const finalData = await adminData.create({ mailId: mailId, password: hashedPswd });
        res.status(200).json({ "message": "Registered successfully... with adminId: " + finalData.id });
    }
})

admin.post('/login', async (req, res) => {
    const { mailId, password } = req.body;
    const userFound = await adminData.findOne({ where: { mailId: mailId } });
    if (userFound != null) {
        bcrypt.compare(password, userFound.password).then(existUser => {
            if (!existUser) {
                return res.status(404).json({ "message": "User not found!" })
            }

            else {

                const authToken = tokenBuilder.authToken(userFound)
                const refreshToken = tokenBuilder.refreshToken(userFound)
                return res.status(200).send({ authToken: authToken, refreshToken: refreshToken })

            }
        })
    }
})


admin.get('/getFoodies', passport.authenticate('authToken', { session: false }), async (req, res) => {

    const getFoodies = await foodieData.findAll();
    if (getFoodies != null)
        res.status(200).send(getFoodies)
    else
        res.status(404).error(err)

})

admin.get('/deleteFoodie/:id', passport.authenticate('authToken', { session: false }), async (req, res) => {

    const checkFoodie = await foodieData.findOne({ where: { id: req.params.id } });
    const checkAddress = await deliveryData.findOne({ where: { foodieID: req.params.id } });

    if (checkFoodie != null && checkAddress!= null) {
        const deleteFoodie = await foodieData.destroy({ where: { id: req.params.id } })
        const deleteAddress = await deliveryData.destroy({ where: { foodieID: req.params.id } })

        res.status(200).send("Foodie removed successfully...");
    }
    else {
        res.status(404).send("Your credentials are not matched with database")
    }

})

admin.get('/getHotel', passport.authenticate('authToken', { session: false }), async (req, res) => {

    const getHotel = await hotelData.findAll();
    if (getHotel != null)
        res.status(200).send(getHotel)
    else
        res.status(404).error(err)

})

admin.post('/addHotel', passport.authenticate('authToken', { session: false }), async (req, res) => {

    const { category, hotelName, area, rating, hotelUrl } = req.body;

    const checkHotel = (await hotelData.findOne({ where: { category: category, hotelName: hotelName, area: area } })) ? true : false;

    if (checkHotel) {
        res.send('Already added this hotel')
    }
    else {
        const addHotel = await hotelData.create({
            category: category, hotelName: hotelName,
            area: area, rating: rating, hotelUrl: hotelUrl
        });
        res.status(200).json({ "message": "Hotel added successfully... with HotelID: " + addHotel.id });
    }

})

admin.get('/deleteHotel/:id', passport.authenticate('authToken', { session: false }), async (req, res) => {

    const checkHotel = await hotelData.findOne({ where: { id: req.params.id } });

    if (checkHotel != null) {
        const deleteHotel = await hotelData.destroy({ where: { id: req.params.id } })
        res.status(200).send("Hotel removed successfully...");
    }
    else {
        res.status(404).send("Your credentials are not matched with database")
    }

})

module.exports = admin;