const route=require('express').Router();

const {registeruser,loginuser} = require('../controller/userController');

route.post('/registeruser',registeruser)
route.post('/loginuser',loginuser)
module.exports = route;
