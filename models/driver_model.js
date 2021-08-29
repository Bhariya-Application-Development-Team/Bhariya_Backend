const mongoose = require('mongoose');
const Driver = mongoose.model('Driver',{
    Fullname : {
        type : String,
        required : true
    },
    Phonenumber : {
        type : String,
        required : true
    },
    password:{
        type : String,
        required : true
    },
    Address:{
        type : String,
        default : "empty"
    },
    image:{
        type : String,
        default : "empty"
    },
    citizenship:{
        type:String,
        default:"empty"
    },
    license:{
        type:String,
        default:"empty"
    },
    bluebook:{
        type:String,
        default:"empty"
    },
    Role:{
        type: String,
        required : true,
        enum: ["Driver", "Admin", "User"],
        default: "Driver"
    }

});

module.exports = Driver;