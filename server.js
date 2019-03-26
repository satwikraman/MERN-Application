const express=require("express");
const app=express();
const morgan=require("morgan");
const port=process.env.PORT || 4000;
const mongoose=require("mongoose");
// var User=require("./appss/models/user");      // packages
const bodyParser=require("body-parser");
const bcrypt=require("bcrypt-nodejs");
const router=express.Router();
const passport = require('passport');

var appRoutes= require('./routes/api')(router);
var path=require("path");


const Register=require('./models/schema');

let dburl='mongodb://localhost:27017/Registrationdb'
mongoose.connect(dburl, (err)=> {
    if(err){
        console.log("Not connected");
    }else
    {
        console.log("succssfully connected");   //Database connection
    }
});
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/api',appRoutes);

app.get('/registration',(req,res)=>{
    res.sendFile(__dirname+'/registration.html');
});
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});
app.listen(port,()=>{
    console.log(`Running on ${port}`);
});