const mongoose = require('mongoose');
const Trip = mongoose.model('Trip',{
    Source : {
        type : String,
        required : true
    },
    Destination : {
        type : String,
        required : true
    },
    Date:{
        type : String,
        required : true
    },
    cost:{
        type : String,
        default : "empty"
    },
    ReferenceId:{
        type : String,
        required : true
    },
    Vehicle:{
        type: String,
        required : true
    },
    status:{
        type: String,
        required : true
    },
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    DriverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Driver"
    }

});

module.exports = Trip;