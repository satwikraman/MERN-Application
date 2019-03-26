const express=require("express");
const app=express();
const morgan=require("morgan");
const port=process.env.PORT || 4000;
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const bcrypt=require("bcrypt-nodejs");
const passport = require('passport');

var appRoutes= require('./routes/api');
var path=require("path");


//app.use(morgan('dev'));
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