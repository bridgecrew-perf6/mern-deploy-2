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
    school: [{ type: mongoose.Schema.Types.ObjectId, ref: 'School' }]
},
{timestamps:true});

var SchoolSchema = new mongoose.Schema({
    schoolname: String,
});


// var Event  = mongoose.model('Event', eventSchema);
// var Person = mongoose.model('Person', personSchema);

// module.exports={
//     Event,Person
// }

const EventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    
},
{timestamps:true});

var User = mongoose.model("User",UserSchema);
var School = mongoose.model("School",SchoolSchema);
var EventSchool = mongoose.model("EventSchool",EventSchema);

module.exports={
    User,School,EventSchool
}