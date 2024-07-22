const express = require('express');
const router = express.Router();
//user get data, post and everything we do in this page
router.get("/",(req,res)=>{
    res.send("hey its user routes");
});

//to use it in the index fle we export it
module.exports = router;

