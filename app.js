var express=require('express');
var bodyParser=require('body-parser');
const mongoose=require('mongoose');
var app=express();
const register=require('./models/schema');

mongoose.connect('mongodb://localhost:27017/RegistrationDB',function (err) {
    if(err){
        console.log("Not connected");
    }else
    {
        console.log("succssfully connected");   //Database connection
    }

});



app.use(bodyParser.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});
app.post('/',(req,res)=>{
    let ip=req.body;
    console.log(ip);
    res.send('data posted succesfully');
});
app.get('/hey',function(req,res){
    res.send("Hellwo world")
})
app.get('/registration',(req,res)=>{
    res.sendFile(__dirname+'/registration.html');
});
app.post('/registration',(req,res)=>{

    let rg=req.body;
    register.insert
    console.log(rg);
    res.send('Registration succesfull');
});

var port=4000;
app.listen(port,()=>{
    console.log(`Running on ${port}`);
});