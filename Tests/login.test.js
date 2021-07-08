// use the path of your model
const User = require('../models/user_model');
const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs');
// use the new name of the database               
const url = 'mongodb://localhost:27017/new_database_name';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});
afterAll(async () => {
    await mongoose.connection.close();
});
describe('user Schema test anything', () => {
    // the code below is for insert testing
    it('Add User testing anything', async () => {
        const login = {
            'Phonenumber': '9863841998',
            'password': 'wang123'

        };
        

        var user =  await User.findOne({ Phonenumber: login.Phonenumber }).exec();
        return expect(user.password).toEqual(login.password)
        // return bcryptjs.compare(login.password, user.password, function (err, result) {
        //     expect(result).toEqual(true);
        // })
       
      
    });






})
// the code below is for delete testing
//  it('to test the delete Admin is working or not', async () => {
//  const status = await Admin.deleteMany();
//  expect(status.ok).toBe(1);
// });

// it('to test the update', async () => {
//     return Product.findOneAndUpdate({_id :Object('5d20c71c0da2982d681e4bf0')}, 
//    {$set : {pname:'ram'}})
//     .then((pp)=>{
//     expect(pp.pname).toEqual('ram')
//     }) 
//    });

// // use the path of your model
// const Pet = require('../models/user_model');
// const mongoose = require('mongoose');
// const User = require('../models/user_model');
// // use the new name of the database
// const url = 'mongodb://localhost:27017/new_database_name';
// beforeAll(async () => {
//     await mongoose.connect(url, {
//         useNewUrlParser: true,
//         useCreateIndex: true
//     });
// });
// afterAll(async () => {
//     await mongoose.connection.close();
// });
// describe('user testing', () => { // the code below is for insert testing
//     it('Add user testing', () => {
//         const user = {
//             'Phonenumber': '9863841998',
//             'password': 'wang123'

//         };
//         return User.create(user).then((pro_ret) => {
//             expect(pro_ret.Phonenumber).toEqual('9863841998');
//         });
//     });
//     it('to test the update', async () => {
//         return User.findOneAndUpdate({ Phonenumber: Object('9863841998') }, { $set: { Phonenumber: '9821455357' } })
//             .then((pp) => {
//                 expect(pp.Phonenumber).toEqual('9863841998')
//             });
//     })
// });

// // //the code below is for delete testing
// it('to test the delete user is working or not', async () => {
//     const status = await User.deleteMany(); expect(status.ok).toBe(1);
// });