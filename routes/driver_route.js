const express = require('express');
const router = express.Router();
const Driver = require('../models/driver_model');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const upload = require('../middleware/uploads');
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");

router.post('/driver/register', upload.single('image'), function (req, res) {

    // const errors = validationResult(req);

    
        const Fullname = req.body.Fullname;
        const Address = req.body.Address;
        const Phonenumber = req.body.Phonenumber;
        const Role = req.body.Role;
        const password = req.body.password;
        const image = "";
        bcryptjs.hash(password, 10, function (err, hash) {
            const data = new Driver({

                Fullname: Fullname,
                Address: Address,
                Phonenumber: Phonenumber,
                image: image,
                Role: Role,
                password: hash
            })
            data.save().then(function (result) {
                res.status(201).json({ success:true })
                console.log("Registered Successfull");
            }).catch(function (err) {
                res.status(500).json({ error: err });
            })

        })
    
});

router.post('/driver/login', function (req, res) {
    const Phonenumber = req.body.Phonenumber;
    const password = req.body.password;
    Driver.findOne({ Phonenumber: Phonenumber })
        .then(function (driverData) {
            if (driverData === null) {
                // username false
                console.log("Username doesn't exsit!")
                return res.status(401).json({ message: "Invalid credentials!!" })
            }
            // if username exists
            bcryptjs.compare(password, driverData.password, function (err, result) {
                if (result === false) {
                    // password wrong
                    console.log("password  Incorrect!")
                    return res.status(401).json({ message: "Invalid credentials!!" })
                }
                // all good
                console.log("Login Sucessful!")
                // then generate token - ticket
                const token = jwt.sign({ driverId: driverData._id }, 'anysecretkey');
                //  res.send(token)
                return res.status(200).json({

                    success: true,
                    token: token,
                    id: driverData._id
                })
            })

        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })

})

router.get("/driver/single", auth.verifyDriver, function (req, res) {
    console.log('.')
    const id = req.driver._id;
    Driver.findOne({ _id: id }).then(
        function (data) {
            res.status(200).json({ success: true, Fullname: data.Fullname, PhoneNumber : data.Phonenumber, Address: data.Address, image: data.image})
        })
        .catch(function () {
            res.status(500).json({ error: e })
        })
});


router.put('/driver/registration/citizenship',upload.single('image'), function(req,res){
    if (req.file == undefined) {
        console.log(req.file)
        return res.status(400).json({
            message: 'Invalid File Format!'
        })
    }
  
    const temp = req.body.Phonenumber
    Phonenumber = (temp.replace(/['"]+/g, ''))
    const image = req.file.path;
    console.log(Phonenumber+"Citizenship")


    Driver.updateOne({Phonenumber : Phonenumber},{citizenship : image})
    .then(function(){
        console.log(Phonenumber+"Citizenship")
        res.status(200).json({success:true})
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })


});

router.put('/driver/registration/license',upload.single('image'), function(req,res){
    if (req.file == undefined) {
        console.log(req.file)
        return res.status(400).json({
            message: 'Invalid File Format!'
        })
    }
  
    const temp = req.body.Phonenumber
    Phonenumber = (temp.replace(/['"]+/g, ''))
    const image = req.file.path;

    Driver.updateOne({Phonenumber : Phonenumber},{license : image})
    .then(function(){
        console.log(Phonenumber+"License")
        res.status(200).json({success:true})
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })


});

router.put('/driver/registration/bluebook',upload.single('image'), function(req,res){
    if (req.file == undefined) {
        console.log(req.file)
        return res.status(400).json({
            message: 'Invalid File Format!'
        })
    }
  
    const temp = req.body.Phonenumber
    Phonenumber = (temp.replace(/['"]+/g, ''))
    const image = req.file.path;

    Driver.updateOne({Phonenumber : Phonenumber},{bluebook : image})
    .then(function(){
        console.log(Phonenumber+"Bluebook")
        res.status(200).json({success:true})
    })
    .catch(function(err){
        res.status(500).json({message:err})
    })


});

module.exports = router;