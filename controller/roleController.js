const express=require('express');
const Role=require('../model/role');
const dotenv=require('dotenv');
dotenv.config();
const bcrypt=require('bcrypt');
const Jwt=require('jsonwebtoken');
const role = require('../model/role');

exports.createuser=async(req,res)=>{
    const {email, password}=req.body;    
    try{
        if(!email || !password){
            return res.status(400).json({message:"email and password are required"});
        }
        const existingUser=await Role.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exists"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new Role({email,password:hashedPassword, role:"user"});
        await newUser.save();
        res.status(201).json(newUser);
    }catch(error){
        res.status(400).json({error:error.message});
    }

    }

    exports.createAdmin=async(req,res)=>{
        const {email, password}=req.body;
        try{
            if(!email || !password){
                return res.status(400).json({message:"email and password are required"});
            }
            const existingUser=await Role.findOne({email});
            if(existingUser){
                return res.status(400).json({message:"user already exists"});
            }
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            const newUser=new Role({email, password:hashedPassword, role:"admin"});
            await newUser.save();
            res.status(201).json(newUser);
        }catch(error){
            res.status(400).json({error:error.message});
        }
      
    }



    exports.loginuser=async(req,res)=>{
        const {email, password}=req.body;
        try{
            if(!email || !password){
                return res.status(400).json({message:"email and password are required"});
            }
            const user=await Role.findOne({email});
            if(!user){
                return res.status(400).json({message:"user not found"});
            }
            const isPasswordValid=await bcrypt.compare(password,user.password);
            if(!isPasswordValid){
                return res.status(400).json({message:"invalid password"});
            }
            const token= Jwt.sign({id:user._id,
                email:user.email,
                role:user.role
            },process.env.JWT_SECRET,{expiresIn:"1d"});
            res.json({token});
            console.log(`congratulartions you are logged in as${user.role}`);
            console.log(user.role);
        }catch(error){
            res.status(400).json({error:error.message});
        }
      
    }


   

    //create a guard for the admin verification
    exports.verifyAdmin=async(req,res,next)=>{
        try{
            const token=req.headers.authorization.split(" ")[1];
            const decoded= Jwt.verify(token,process.env.JWT_SECRET);
            const user= Role.findById(decoded.id);

            if(user.role!=="admin"){
                return res.status(403).json({message:"unauthorized"});
            }
            req.user=user;
            next();

           
        }catch(error){
            res.status(400).json({error:error.message});
        }
      
    }
    exports.getusers=async(req,res)=>{
        try{
            const users=await Role.find({});
            res.status(200).json(users);
        }catch(error){
            res.status(400).json({error:error.message});
        }

       
    }

    
    
    

    exports.deleteuser=async(req,res)=>{

        try{
            
            const users=await Role.findByIdAndDelete(req.params.id);
            res.status(200).json(users);
        }catch(error){
            res.status(400).json({error:error.message});
        }

 }

    exports.updateuser=async(req,res)=>{
        
        try{
            const users=await Role.findByIdAndUpdate(req.params.id,req.body,{new:true});
            res.status(200).json(users);
        }catch(error){
            res.status(400).json({error:error.message});
        }

        
    }
    

