import { sign } from 'jsonwebtoken';
import { Router } from 'express';
import { connect } from "mongoose";
import { name, password, email as _email, phone, create, find } from '../models/schema';

let dburl='mongodb://localhost:27017/Registrationdb'
connect(dburl, (err)=> {
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
        _email = req.body.email;
        phone=req.body.phone;
        if (req.body.name == null || req.body.name == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.phone == ''|| req.body.phone == null || req.body.phone == '') {
            res.json({success:false,message:'you have to give Username,password and email'});
        } else {
            create(req.body ,(err)=> {
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
module.exports= defaultrouter;