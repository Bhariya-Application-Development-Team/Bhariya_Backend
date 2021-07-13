const express = require('express');
const router = express.Router();
const User = require('../models/user_model');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const upload = require('../middleware/uploads');
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");


router.post('/register', [
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
        const Role = req.body.Role;
        const image = "";
        bcryptjs.hash(password, 10, function (err, hash) {
            const data = new User({

                Fullname: Fullname,
                Address: Address,
                Phonenumber: Phonenumber,
                Role: Role,
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


router.post('/user/login', function (req, res) {
    const Phonenumber = req.body.Phonenumber;
    const password = req.body.password;
    User.findOne({ Phonenumber: Phonenumber })
        .then(function (userData) {
            if (userData === null) {
                // username false
                console.log("Username doesn't exsit!")
                return res.status(401).json({ message: "Invalid credentials!!" })
            }
            // if username exists
            bcryptjs.compare(password, userData.password, function (err, result) {
                if (result === false) {
                    // password wrong
                    console.log("password  Incorrect!")
                    return res.status(401).json({ message: "Invalid credentials!!" })
                }
                // all good
                console.log("Login Sucessful!")
                // then generate token - ticket
                const token = jwt.sign({ userId: userData._id }, 'anysecretkey');
                //  res.send(token)
                return res.status(200).json({

                    success: true,
                    token: token,
                    id: userData._id
                })
            })

        })
        .catch(function (e) {
            res.status(500).json({ message: e })
        })

})

router.get("/user/single", auth.verifyUser, function (req, res) {
    console.log('.')
    const id = req.user._id;
    User.findOne({ _id: id }).then(
        function (data) {
            res.status(200).json({ success: true, Fullname: data.Fullname, PhoneNumber : data.Phonenumber, Address: data.Address, image: data.image})
        })
        .catch(function () {
            res.status(500).json({ error: e })
        })
});

router.put("/user/password/reset",function(req,res){
    const phonenumber = req.body.phonenumber
    const new_password = req.body.password

    bcryptjs.hash(new_password, 10, function (err, hash) {
    User.updateOne({phonenumber : phonenumber},{password : hash})
    .then(function(){
        console.log("Successfully Changed")
        res.status(200).json({success: true})
    })
    .catch(function(err){
        console.log(err)
        res.status(500).json({error: err})
    })
})


//updating profile picture
router.put('/user/profilepicture', auth.verifyUser,  upload.single('image'), function (req, res) {
    console.log("hit");
    if (req.file == undefined) {
        console.log(req.file)
        return res.status(400).json({
            message: 'Invalid File Format!'
        })
    }
  
    const image = req.file.path;
    const id = req.user._id;
    Customer.updateOne({ _id: id },
        { image: image })
        .then(
            function (data) {
                console.log("updated")
                res.status(200).json({ message: "Updated profile picture", user: data.image, success:true })
            })
        .catch(function (e) {
            console.log(e)
            res.status(500).json({ error: e.message })
        })
});



})

// editing profile picture


router.put('/user/updateprofile', auth.verifyUser,  function (req, res) {

    const Fullname = req.body.Fullname;
    const Address = req.body.Address;
    const id = req.user._id;
    User.updateOne({ _id: id },
        { Fullname: Fullname, Address: Address })
        .then(
            function (data) {
                console.log("updated")
                res.status(200).json({ message: "Successfully Updated", success:true })
            })
        .catch(function (e) {
            console.log(e)
            res.status(500).json({ error: e.message })
        })
});


module.exports = router;