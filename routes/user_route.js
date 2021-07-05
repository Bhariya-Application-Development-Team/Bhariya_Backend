const express = require('express');
const router = express.Router();
const User = require('../models/user_model');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const upload = require('../middleware/uploads');
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");


router.post('/register', [
    check('Fullname', 'Fullname is required !').not().isEmpty(),
    check('Address', 'Address is required !').not().isEmpty(),
    check('Phonenumber', 'Phone Number is required !').not().isEmpty(),
    check('password', 'Password is required !').not().isEmpty(),
    check('Role', 'Your Role is required !').not().isEmpty()
], upload.single('image'), function (req, res) {
    console.log(req.body)
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const Fullname = req.body.Fullname;
        const Address = req.body.Address;
        const Phonenumber = req.body.Phonenumber;
        const password = req.body.password;
        const Role = req.body.role;
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

module.exports = router;