
const express = require('express');
const router = express.Router();
const Trip = require('../models/trip');
const { check, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const upload = require('../middleware/uploads');
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");

router.post('/saveTrip', function (req, res) {
        const Source = req.body.Source;
        const Destination = req.body.Destination;
        const Date = req.body.Date;
        const ReferenceId = req.body.ReferenceId;
        const UserId = req.params.id;
        const DriverId = req.body.DriverId;
        const Status = req.body.Status;
        const Vehicle = req.body.Vehicle;
        const Cost = req.body.Cost;
        
            const data = new Trip({

                Source: Source,
                Destination: Destination,
                Date: Date,
                ReferenceId: ReferenceId,
                UserId: UserId,
                DriverId: DriverId,
                Status :Status,
                Vehicle : Vehicle,
                Cost : Cost
            })
            data.save().then(function (result) {
                res.status(201).json({ success:true })
                console.log("Registered Successfull");
            }).catch(function (err) {
                res.status(500).json({ error: err });
            })
  
});

router.get('/trip/show', function (req, res) {

    Trip.find().then(function (data) {
        //console.log(data1);
        res.status(201).json({ success:true , data})
    })
})


module.exports = router;
