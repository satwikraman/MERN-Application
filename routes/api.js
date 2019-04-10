const  sign =require('jsonwebtoken') ;
const  Router  =require('express');
const  mongoose = require("mongoose");
const register=require('../models/schema');

let dburl='mongodb://localhost:27017/Registrationdb'
mongoose.connect(dburl, (err)=> {
    if(err){
        console.log("Not connected");
    }else
    {
        console.log("succssfully connected");   //Database connection
    }
});

const router=Router();
    router.post('/registration',(req,res)=>{
        name = req.body.name;
        password = req.body.password;
        email = req.body.email;
        phone=req.body.phone;
        if (name == null || name == '' || password == null || password == '' || email == null ||phone == ''|| phone == null || phone == '') {
            res.json({success:false,message:'you have to give Username,password and email'});
        } else {
           register.create(req.body ,(err)=> {
                if (err) throw err
                else res.json({success:true,message:'User Created'});
            });
        }
    
    });
    router.post('/',(req,res)=>{
        find({email:req.body.email}).exec( (err, register)=> {
            if(err) throw err;
    
            if(!register) {
                res.send( 'Could not Authenticate User');
            }
            else if(register){
                if(req.body.password){
                    var validpassword=register.comparePassword(req.body.password);
                }
                else{
                    res.send('No Password Provided');
                }
                if(!validpassword){
                    res.send( 'Could not Authenticate Password');
                }
                else{
                    var token=sign({email:register.email},'secret',{ expiresIn: '24h' });
                    res.json({success: true, message: 'User Authenticated',token:token});
                }
    
    
            }
    
    });   
    });
module.exports= router;