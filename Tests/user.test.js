// use the path of your model
const User= require('../models/user_model');
const mongoose = require('mongoose');

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
 it('Add User testing anything', () => {
 const user = {
 'Fullname':'wangchhu',
 'Phonenumber': '9863841998',
 'password': 'wang123',
 'Address': 'kapan',
 'image':'betta.png',
 'Role':'User'
 };
 
 return User.create(user)
 .then((pro_ret) => {
 expect(pro_ret.Fullname).toEqual('wangchhu');
 });
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
   
   