const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    photo: {
        type: String,
    },
    
},
{timestamps:true});


module.exports = mongoose.model("User",UserSchema);