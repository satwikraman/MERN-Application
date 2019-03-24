const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express();
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
    let Login=Register.findOne({},  { projection: { _id: 0,name:1, email: 1, password: 1 } });
    for(let i in Login){
        if((i.email===ip.email)&&(i.password===ip.password)){
            res.send(`hey ${i.name} , you are succesfully logged in`)
        }
    }
});

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

let port=4000;
app.listen(port,()=>{
    console.log(`Running on ${port}`);
});