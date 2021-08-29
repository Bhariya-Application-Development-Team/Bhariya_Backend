const jwt = require('jsonwebtoken');
const User   = require('../models/user_model');
const Driver   = require('../models/driver_model');



//guard 1
module.exports.verifyUser  = function(req, res, next){
    console.log(req.body)
    try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const data = jwt.verify(token, 'anysecretkey');
    id = data.userId
    console.log(id)
    // in this data id is availabel..
    User.findOne({_id : id})
    .then(function(userData){
        req.user = userData;
        console.log(data)
        console.log(req.user)
        console.log("this is user")
        next();
    })
    .catch(function(ee){
        console.log(ee)
        res.status(401).json({error : ee});
    })
    }

    catch(e){
        console.log(e)
        res.status(401).json({error : e})
    }
  
}

//driver
module.exports.verifyDriver  = function(req, res, next){
    console.log(req.body)
    try{
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const data = jwt.verify(token, 'anysecretkey');
    id = data.driverId
    console.log(id)
    // in this data id is availabel..
    Driver.findOne({_id : id})
    .then(function(driverData){
        req.driver = driverData;
        console.log(data)
        console.log(req.driver)
        console.log("this is driver")
        next();
    })
    .catch(function(ee){
        console.log(ee)
        res.status(401).json({error : ee});
    })
    }

    catch(e){
        console.log(e)
        res.status(401).json({error : e})
    }
  
}


module.exports.verifyAdmin = function(req,res,next){
    if(!req.user){
        return res.status(401).json({message : "Unathorized"})
    }
    else if(req.user.role==="Admin"){
        next()
    }
    else{
        return res.status(400).json({message : "Unauthorized"})
    
    }
}



















