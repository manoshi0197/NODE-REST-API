const User = require("../models/User");
const express = require('express');
const router = express.Router();
const bcrupt = require("bcrypt");
//user get data, post and everything we do in this page
router.get("/", (req, res) => {
    res.send("hey its user routes");
});


//update user
 router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.user.isAdmin){
        if(req.body.password){//user is trying to generate password again
            try{
                const salt = await bcrypt.genSalt(10);// new password is generated
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
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        await User.findByIdAndDelete(req.params.id);//action takent to delete the user
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(403).json("You can delete only your account!");
    }
  });
//get a user
router.get("/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  });

//unfollow a user

//to use it in the index fle we export it
module.exports = router;

