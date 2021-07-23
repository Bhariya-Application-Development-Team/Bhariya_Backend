const mongoose = require('mongoose'); // install first & third party 
const path = require('path'); // no need to install 
const express = require('express'); //install first
const cors = require('cors');
const  bodyParser = require('body-parser')   //no need to install  use app.use(body praiser also)
const db = require('./Database/db');
const userroute = require('./routes/user_route');
const driverroute = require('./routes/driver_route')

const app = express(); // third party
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine', 'hbs');

const publicDir = path.join(__dirname, 'pictures');
app.use("/pictures",express.static(publicDir));
app.use(userroute);
app.use(driverroute);

app.listen(3000, (err)=> {
    console.log("started at http://localhost:3000/")
})


