const express = require('express')
const router = express.Router()
const Feedback = require('../models/feedbackModel')
const auth = require('../middleware/auth')
const upload = require('../middleware/uploads')

router.post('/feedback_insert', function(req,res){
    console.log("Working")
    const user_id = req.body.user_id
    const feedback = req.body.feedback
    const username = req.body.username
    console.log(req.body.feedback)

    const data = new Feedback({
        user_id : user_id,
        feedback : feedback,
        date : Date.now(),
        username : username
    })
    data.save()
    .then(function(result){
        res.status(200).json({success: true})
        console.log(result)
    })

    .catch(function(err){
        res.status(500).json({message : err})
    })
})

router.get('/user_id_load/:id',function(req,res){
    const user_id = req.params.id
    console.log(user_id)
    
    Feedback.find({user_id:user_id})
    .then(function(data){
        res.status(200).json(data)
        console.log(data)
    })
    .catch(function(e){
        res.status(500).json({message : e})
    })

})

router.post('/user_id_load/',function(req,res){
    const user_id = req.body.user_id
    Feedback.fi
    Feedback.find({user_id:user_id})
    .then(function(data){
        res.status(200).json({success:true, data :data})
    })
    .catch(function(e){

        res.status(500).json({message : e})
    })

})

module.exports = router
