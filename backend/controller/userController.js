const User=require('../model/User');
const jwt=require('jsonwebtoken');
const keys=require('../config/keys');

exports.registeruser=(req,res)=>{
    let name = req.body.name;
    let gmail = req.body.gmail;
    let password = req.body.password1;
    let password2 = req.body.password2;

    const error={};
    User.findOne({gmail:gmail}).then(user=>{
        if(user){
            error.gmail='Email is already exists.';
            res.status(400).json(error);
        }
        else{
            if(password !== password2) {
                error.password = 'Not same'
                res.json(error)
            }
            else {
                const newuser=new User({
                    name:name,
                    gmail:gmail,
                    password:password
                });
                newuser.save()
                    .then(result=>res.json(result))
                    .catch(err=>console.log(err));
            }
        }
     })
}

exports.loginuser=(req,res)=>{
    const error={};
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                if(user.password===req.body.password){
                    const payload={id:user.id,name:user.name};
                    jwt.sign(
                        payload,
                        keys.secretOrkey,
                        {expiresIn: 3600},
                        (err,token)=>{
                                return res.json({
                                success:true,
                                token: 'Bearer '+token
                            });
                        }
                    )
                }else{
                    error.password='password is wrong.';
                    return res.status(400).json(error);
                }
            }else{
                error.email='email is wrong.';
                return res.status(400).json(error);
            }
        })
}
