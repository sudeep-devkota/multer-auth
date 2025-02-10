const express= require('express');
const app=express();
const role=require('./routes/role');
const mongoose=require('mongoose');
const ejs=require('ejs');
const path=require('path');




const connectDB=require('./configuration/dbrole');
connectDB();

const dotenv=require('dotenv');
dotenv.config();
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views')); //

// join the path for the public folder
app.use(express.static(path.join(__dirname, 'public')));



app.get('/create',(req,res)=>{
   return res.render('create');
});
app.get('/login',(req,res)=>{
     return res.render('login');
});
app.get('/mainpage',(req,res)=>{
   return res.render('mainpage');
});






app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/role',role);


const port=process.env.PORT;
app.listen(port,()=>{console.log(`server is running on localhost:${port}`);

});
