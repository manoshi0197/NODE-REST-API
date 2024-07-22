const express = require('express');
const router = express.Router();
const User = require("../models/User");

//REGISTER
router.post("/register", async(req, res) => {
    const user = await new User({
        username:"manoshi",
        email: "manoshinath17@gmail.com",
        password:"123456"
    })
    //save this user
    await user.save(); 
    res.send("ok");
});

module.exports = router;