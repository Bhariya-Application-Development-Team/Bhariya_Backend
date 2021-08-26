const mongoose = require('mongoose'); // install first & third party 

mongoose.connect('mongodb+srv://bhariya123:bhariya123@bhariya.hnzym.mongodb.net/Bhariya?retryWrites=true&w=majority',{ // local host & port no
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology : true // to remove deprecated warnings

})
