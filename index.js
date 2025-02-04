const express= require('express');
const app=express();
const role=require('./routes/role');



const connectDB=require('./configuration/dbrole');
connectDB();

const dotenv=require('dotenv');
dotenv.config();
const mongoose=require('mongoose');



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/role',role);

const port=process.env.PORT;
app.listen(port,()=>{console.log(`server is running on localhost:${port}`);

});
