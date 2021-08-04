// use the path of your model
const Driver= require('../models/driver_model');
const mongoose = require('mongoose');


//driver registration test
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
 const driver = {
 'Fullname':'Amrit Panthi',
 'Address': 'Setopul',
 'Phonenumber': '9818693550',
 'password': 'amrit99',
 'image':'amrit.png'
 };
 
 return Driver.create(driver)
 .then((pro_ret) => {
 expect(pro_ret.Fullname).toEqual('Amrit Panthi');
 });
 });

 
//driver citizenship registration
 it('Add User testing anything', () => {
    const driver = {
    'Fullname' : 'Amrit Panthi',
    'password': 'amrit99',
    'image':'amrit.png',
    'Phonenumber': '9818693550'
    };
    
    return Driver.create(driver)
    .then((pro_ret) => {
    expect(pro_ret.Phonenumber).toEqual('9818693550');
    });
    });

    //driver license registration
 it('Add User testing anything', () => {
    const driver = {
    'Fullname' : 'Amrit Panthi',
    'password': 'amrit99',
    'image':'amrit.png',
    'Phonenumber': '9818693550'
    };
    
    return Driver.create(driver)
    .then((pro_ret) => {
    expect(pro_ret.Phonenumber).toEqual('9818693550');
    });
    });


    //driver bluebook registration
 it('Add User testing anything', () => {
    const driver = {
    'Fullname' : 'Amrit Panthi',
    'password': 'amrit99',
    'image':'amrit.png',
    'Phonenumber': '9818693550'
    };
    
    return Driver.create(driver)
    .then((pro_ret) => {
    expect(pro_ret.Phonenumber).toEqual('9818693550');
    });
    });



    


})