const express=require('express');
const app=express();
const port=process.env.PORT || 4000;
const bodyParser=require('body-parser') ;

const appRoutes = require('./routes/api');


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