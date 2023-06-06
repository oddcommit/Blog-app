const route=require('express').Router();

const {add,update,updateLikes,updatewath} = require('../controller/blogController');
route.post('/test',(req, res) => res.json('work'));

route.post('/add',add)
route.put('/update',update)
route.put('/updateLike',updateLikes)
route.put('/updatewatch',updatewath)
module.exports = route;
