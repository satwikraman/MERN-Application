const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

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
var register=new Register();
app.get('/registration',(req,res)=>{
    res.sendFile(__dirname+'/registration.html');
});

app.post('/registration',(req,res)=>{
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

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

app.post('/',(req,res)=>{
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



let port=4000;
app.listen(port,()=>{
    console.log(`Running on ${port}`);
});