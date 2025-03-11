const mongoose = require("mongoose");
//SCHEMA: use it inside routes
const UserSchema = new mongoose.Schema({
    //properties
    username:{
        type:String,
        //restriction
        require:true,
        min:3,
        max:20,//characters
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    profilePicture:{
        type:String,
        defalut:""//default value
    },
    coverPicture:{
        type:String,
        defalut:""//default value
    },
    followers:{
        type:Array,//keep user ids
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc: {
        type:String,
        max:50
    },
    city: {
        type:String,
        max:50
    },
    from:{ //hometown
        type:String,
        max:50
    },
    relationship: {
        type:Number,
        enum:[1,2,3],//hardcoded
    }
},
//creating timestamps, if u create user or update its automatically update the time stamp
{timestamps:true} 
);

module.exports = mongoose.model("User",UserSchema)