const express = require('express');
const router = express.Router();
const Driver = require('../models/driver_model');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const upload = require('../middleware/uploads');
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");

router.post('/driver/register', [
    // check('Fullname', 'Fullname is required !').not().isEmpty(),
    // check('Address', 'Address is required !').not().isEmpty(),
    // check('Phonenumber', 'Phone Number is required !').not().isEmpty(),
    // check('password', 'Password is required !').not().isEmpty(),
    // check('Role', 'Your Role is required !').not().isEmpty()
], upload.single('image'), function (req, res) {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const Fullname = req.body.Fullname;
        const Address = req.body.Address;
        const Phonenumber = req.body.Phonenumber;
        const password = req.body.password;
        const image = "";
        bcryptjs.hash(password, 10, function (err, hash) {
            const data = new Driver({

                Fullname: Fullname,
                Address: Address,
                Phonenumber: Phonenumber,
                image: image,
                password: hash
            })
            data.save().then(function (result) {
                res.status(201).json({ success:true })
                console.log("Registered Successfull");
            }).catch(function (err) {
                res.status(500).json({ error: err });
            })

        })
    }
    else {
        // invalid
        res.send(errors.array());
    }
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