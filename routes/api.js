var User=require("../models/schema");
var jwt = require('jsonwebtoken');
var secret='harrypotter';
var path=require("path");
module.exports= (router)=> {
    router.post('/registration',(req,res)=>{
        register.name = req.body.name;
        register.password = req.body.password;
        register.email = req.body.email;
        register.phone=req.body.phone;
        if (req.body.name == null || req.body.name == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.phone == ''|| req.body.phone == null || req.body.phone == '') {
            res.json({success:false,message:'you have to give Username,password and email'});
        } else {
            register.save(function (err) {
                if (err) {
                    throw err
                } else {
                    res.json({success:true,message:'User Created'});
                }
            });
        }
    
    });
    router.post('/',(req,res)=>{
        register.findOne({email:req.body.email}).exec( (err, register)=> {
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
                    var token=jwt.sign({email:register.email},'secret',{ expiresIn: '24h' });
                    res.json({success: true, message: 'User Authenticated',token:token});
                }
    
    
            }
    
    });   
    });
}