const mongoose = require('mongoose')

const Feedback = mongoose.model('Feedback',{
    username : {
        type : String   
    },
    date:{
        type : Date
    },
    user_id : {
        type : String
    },

    feedback : {
        type : String
    }

})


module.exports = Feedback;