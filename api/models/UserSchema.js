const mongoose = require("mongoose");
const Schema = mongoose.Schema
var eventSchema = Schema({
    title     : String,
    location  : String,
    firstname: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
    
});

var personSchema = Schema({
    firstname: String,
    lastname: String,
    email: String,
    eventsAttended: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
});

var Event  = mongoose.model('Event', eventSchema);
var Person = mongoose.model('Person', personSchema);

module.exports={
    Event,Person
}