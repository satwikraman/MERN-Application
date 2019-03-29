 import { Schema as _Schema, model } from 'mongoose';
 const Schema=_Schema;
 import { hash as _hash, compareSync } from "bcrypt-nodejs";

 
 const RegistrationSchema= new Schema({
     name: {
         type:String,
         lowercase:true, 
         required:[true,'Name is required'], 
        },
     phone : {
         type:Number,  
         required:[true,'Phone Number is required'],
         unique:true, 
        },
     email: {
         type:String, 
         lowercase:true, 
         required:[true,'Email is required'],
         unique:true
        },
     password : {
         type:String, 
         required:[true,'Password is required']
        }
 });

 RegistrationSchema.pre('save',function(next) {

    var user=this;
    _hash(user.password,null,null,function (err,hash) {   //password encryptingggg
        if(err)
                return next(err);
        user.password=hash;
        next();
    
    })
    });


RegistrationSchema.methods.comparePassword=function (password) {
    return compareSync(password, this.password);
}
 module.exports =defaultmodel('Register',RegistrationSchema);
