const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User.js');
const Place = require('./models/Place.js');
const Booking = require('./models/Booking.js');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const { fileURLToPath } = require('url');
const { dirname } = require('path');
const multer = require('multer');
const fs = require('fs');
const placeRoutes = require('./placesRoutes.js');
const axios = require('axios');
const app = express();

const filename = __dirname + '/' + process.argv[1];;

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'));
app.use(placeRoutes);
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173'],    
}));

mongoose.connect(process.env.MONGO_URL)

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "asdasdadgwg11f1fbxb";

function getUserDataFromToken(req) {
    const {token} = req.cookies;
    return new Promise((resolve, reject) => {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    })
}

app.get('/test', (req,res) => {
    res.json('hello');
})

app.post('/register', async (req,res) => {
    const {name, email, password} = req.body;

    try{
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(userDoc);
    }catch(ex){
        res.status(422).json(ex);
    }
})

app.post('/login', async (req,res) => {
    const {email, password} = req.body;
    const userDoc = await User.findOne({email})
    
    if(userDoc) {

        const passOk = bcrypt.compareSync(password, userDoc.password);
        
        if(passOk){

            jwt.sign({email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(userDoc);
            });    

        }else{
            res.status(422).json('Incorrect Details');
        }

    }else{
        res.json('not found');
    }
})

app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) throw err;
            const {name,email,_id} = await User.findById(userData.id) 
            res.json({name,email,_id});
        });
    } else{
        res.json(null);
    }
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
})

app.post('/uploads-by-link', async (req,res) => {
    const {link} = req.body;
    const newName = Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    })
    res.json(newName);
})

const photoMiddleware = multer({dest:'uploads/'});
app.post('/upload', photoMiddleware.array('photos', 100), (req,res) => {
    
    const uploadedFiles = [];
    for(let i = 0; i < req.files.length; i++){

        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length-1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\',''));
    }

    res.json(uploadedFiles);
})

app.get('/user-places', (req,res) => {
    const {token} = req.cookies;
    
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const {id} = userData;
        const placeInfo = await Place.find({owner: id});
        if (placeInfo) {
            res.json(placeInfo);
        }
    });
})

app.post('/bookings', async (req,res) => {
    const userData = await getUserDataFromToken(req);
    const {
        place, checkIn, checkOut, 
        numberOfGuest, name, mobile, 
        price
    } = req.body;

    const bookingInfo = await Booking.create({
        place, user: userData.id, checkIn, checkOut, 
        numberOfGuest, name, mobile, 
        price,
    });

    if(!bookingInfo) throw 'Error Occured';
        
    res.json(bookingInfo);
})

app.get('/bookings', async (req,res) => {
    const userData = await getUserDataFromToken(req);
    res.json(await Booking.find({user: userData.id}).populate('place'));
})

app.get('/deletePlaces', async (req,res) => {
    await Place.deleteMany({});
    res.json("Deleted");
})

app.listen(4000);
