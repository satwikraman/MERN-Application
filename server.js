import express from "express";
const app=express();
const port=process.env.PORT || 4000;
import { json, urlencoded } from "body-parser";

import appRoutes from './routes/api';


//app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({extended:true}));
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