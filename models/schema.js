 const mongoose=require('mongoose');
 const Schema=mongoose.Schema;
 
 const RegistrationSchema= new Schema({
     name: String,
     phone : Number,
     email: String,
     password : String
 });
 const Registration=mongoose.model('Register'.RegistrationSchema);
 module.exports=Registration;
