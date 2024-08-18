const express = require('express')
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL);
const Booking = require('./models/Booking');
// console.log(process.env.MONGO_URL)
const cors = require('cors');
const { register } = require('./controllers/register');
const { login } = require('./controllers/login');
const { profile } = require('./controllers/profile')
const authenticate = require('./middlewares/authenticate');
const cookieParser = require('cookie-parser');
const { upload } = require('./controllers/upload');
const multer = require('multer');
const { uploadfile } = require('./controllers/uploadfile');
const { place } = require('./controllers/place');
const { userplace } = require('./controllers/userplace')
const Place = require('./models/Place')
const { putplaces } = require('./controllers/putplaces');


function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, process.env.JWT_SECRET, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
        });
    });
}


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    credentials: true // Allow credentials
})); // for corss origin request
app.use(express.json()); // for reading body in request
app.use(cookieParser());// for reading cookie
app.use('/uploads', express.static(__dirname + '/uploads'));
app.get('/test', (req, res) => {
    res.send('hello bc');
})
app.post('/register', register);
app.post('/login', login);
app.get('/profile', authenticate, profile);
app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true);
});
app.post('/upload-by-link', upload);
const photosMiddleware = multer({ dest: 'uploads' });
app.post('/upload', photosMiddleware.array('photos', 100), uploadfile);
app.post('/places', place);

app.get('/user-places', userplace);



app.get('/places/:id', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const { id } = req.params;
    if (id)
        res.json(await Place.findById(id));
});


app.put('/places', putplaces);

app.get('/places', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    res.json(await Place.find());
});


app.post('/bookings', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    const {
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
    } = req.body;
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name, phone, price,
        user: userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});



app.get('/bookings', async (req, res) => {
    mongoose.connect(process.env.MONGO_URL);
    const userData = await getUserDataFromReq(req);
    res.json(await Booking.find({ user: userData.id }).populate('place'));
});





app.listen(4000);

