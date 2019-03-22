 const mongoose=require('mongoose');
 const Schema=mongoose.Schema;
 
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
 const Registration=mongoose.model('Register',RegistrationSchema);
 module.exports=Registration;
