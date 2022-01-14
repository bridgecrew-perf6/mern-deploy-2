const mongoose = require("mongoose");
const User = require("./User")


const UserLoginSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    // lastname:
    //     { type: Types.ObjectId, ref: 'Users' }
        
 
    
},
{timestamps:true});

module.exports = mongoose.model("UserLogin",UserLoginSchema);