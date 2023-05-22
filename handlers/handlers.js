const express = require("express");
const {Models} = require('../modles/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
var secretkey = "secretkey"
const user_signup= async (req,res)=>{
    try {
        const {name,email,phoneNo,password} = req.body;
        bcrypt.hash(password,10,(err,hash)=>{
            if(err){
                console.log("password cannot be bcrypt");
            }else{
                const user = new Models({
                   name:name,
                   email:email,
                   phoneNo:phoneNo,
                   password: hash   
                })
                user.save()
                .then((value)=>{
                    res.status(201).send(value)
                    console.log(value);
                }).catch((ERR)=>{
                    res.status(500).send(ERR);
                    console.log("error will occured when data will be saved");
                })
            }
        }) 
    } catch (error) {
        console.log("error will be occured in the user_signup function");
    }
}

const user_login= async(req,res)=>{
    const {email,password} = req.body;
    const rspod = await Models.find({email:email})
    console.log(rspod);
    let result = await bcrypt.compare(password ,rspod[0].password)
    console.log(result);
        if(result){
            const user_token={
                id: rspod._id,
                int_at : new Date()
           }
           const tok=jwt.sign(user_token,secretkey,{expiresIn:'1 day'})
           const users=await Models.findOneAndUpdate({email:email},{token:tok});
           console.log(tok);
           res.send(tok)
        
        }else{
            console.log("password galat h sath m email b");
        }
            // const result = await Models.find()
}
// const logout_user = async(req,res)=>{
//     const {email,password} = req.body;
//     const rspod = await Models.find({email:email})
//     console.log(rspod);
//     let result = await bcrypt.compare(password ,rspod[0].password)
//     console.log(result);
//         if(result){
//             const user_token={
//                 id: rspod._id,
//                 int_at : new Date()
//            }
//            const tok=jwt.sign(user_token,secretkey,{expiresIn:'1s'})
//            const users=await Models.findOneAndUpdate({email:email},{token:""});
//            console.log(tok);
//            res.send(tok)
        
//         }else{
//             console.log("password galat h sath m email b");
//         }
// }
module.exports= {user_signup,user_login,/*logout_user*/}
