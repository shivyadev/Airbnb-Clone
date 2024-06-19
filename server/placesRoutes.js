const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Place = require('./models/Place.js');
const User = require('./models/User.js');
const axios = require('axios');
const { format } = require('date-fns');
const app = express.Router();

const jwtSecret = "asdasdadgwg11f1fbxb";
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173'],
}));

const currDate = new Date();
const newDate = new Date(currDate);
newDate.setDate(currDate.getDate() + 1);
const futureDate = new Date(currDate);
const rand = Math.floor(Math.random() * 29) + 2;
futureDate.setDate(currDate.getDate() + rand);

app.post('/places', (req,res) => {
    const {token} = req.cookies;
    const {
        title, address, addedPhotos, 
        description, perks, checkIn, 
        extraInfo, checkOut, maxGuest, 
        price,
    } = req.body;
    
    
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.create({
            owner: userData.id,
            title, address, addedPhotos, 
            description, perks, checkIn, 
            extraInfo, checkOut, maxGuest, 
            price,            
        })
    });
    
    res.json('Created');
})

app.get('/places', async (req,res) => {
    try{
        const places = await Place.find({});
        res.json(places);
    } catch(err){
        console.log(err);
    }
})

app.get('/places/:id', async (req,res) => {
    const {id} = req.params;
    const placeDoc = await Place.findById(id);
    const ownerInfo = await User.findById(placeDoc.owner);
    res.json([placeDoc, ownerInfo]);
})

app.put('/places', async (req,res) => {
    const {token} = req.cookies;
    const {
            id, title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuest, price,
    } = req.body;
    
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id);
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                title, address, addedPhotos,
                description, perks, extraInfo,
                checkIn, checkOut, maxGuest, price,
            });
            await placeDoc.save();
            res.json('Updated');
        }
    });
})

module.exports = app;