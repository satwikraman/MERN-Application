 const mongoose=require('mongoose');
 const Schema=mongoose.Schema;
 const bcrypt=require("bcrypt-nodejs");

 
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
    bcrypt.hash(user.password,null,null,function (err,hash) {   //password encryptingggg
        if(err)
                return next(err);
        user.password=hash;
        next();
    
    })
    });


RegistrationSchema.methods.comparePassword=function (password) {
    return bcrypt.compareSync(password, this.password);
}
 module.exports=mongoose.model('Register',RegistrationSchema);
