var express=require('express');
var bodyParser=require('body-parser');
const mongoose=require('mongoose');
var app=express();
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
mongoose.Promise=global.Promise;


app.use(bodyParser.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});
app.post('/',(req,res)=>{

    let ip=req.body;
    console.log(ip);
    res.send('data posted succesfully');
});

app.get('/hey',(req,res)=>{
    res.send("Hellwo world")
})

app.get('/registration',(req,res)=>{
    res.sendFile(__dirname+'/registration.html');
});

app.post('/registration',(req,res)=>{
    let rg=req.body;
    Register.create(rg).then((data)=>{
        res.send(`hey ${data.name} you are registered`);
    });
    console.log(rg);
   
});

var port=4000;
app.listen(port,()=>{
    console.log(`Running on ${port}`);
});