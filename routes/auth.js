const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Example GET route
// router.get('/', (req, res) => {
//     res.send('Auth route is working');
// });

// REGISTER
router.post("/register", async (req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(req.body.password, salt);
        //create new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        //save user and return response
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error registering user", error: err });
    }
});

module.exports = router;
