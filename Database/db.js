const mongoose = require('mongoose'); // install first & third party 

mongoose.connect('mongodb://localhost:27017/Bhariya',{ // local host & port no
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology : true // to remove deprecated warnings

})
