const User = require("../models/User");
const express = require('express');
const router = express.Router();
const bcrupt = require("bcrypt");
//user get data, post and everything we do in this page
// router.get("/",(req,res)=>{
//     res.send("hey its user routes");
// });

//update user
 router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.user.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(re.body.password, salt);
                res.status(200).json("password has been updated")
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
        //actual user
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            res.status(200).json("Account has been updated")
        } catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("you can update only your account!!");
    }
 })
//Delete user

//get a user

//follow a user

//unfollow a user

//to use it in the index fle we export it
module.exports = router;

