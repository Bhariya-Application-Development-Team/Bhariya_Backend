const mongoose = require('mongoose');
const User = mongoose.model('User',{
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
    Role:{
        type: String,
        required : true,
        enum: ["Admin", "User"],
        default: "User"
    }
});

module.exports = User;