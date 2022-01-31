const router = require("express").Router();
const { Event } = require("../models/UserSchema");
const { Person } = require("../models/UserSchema");
//const UserLoginSchema = require("../models/userLogin")




router.get("/", async (req, res) => {

    try {
        const user = await Person.find();
        res.status(200).json(user)

    } catch (err) {
        res.status(500).json(err)
    }
});



router.get("/getdata", async (req, res) => {

    try {
        Person
            .findOne({ firstname: 'Hariom' ,lastname:"Sharma" })
            .populate('eventsAttended')
            .exec(function (err, person) {
                if (err) return handleError(err);
                // console.log(person);
                // console.log(person);
                res.status(200).json(person)
            });


        // const user = await Person.find();
        // res.status(200).json(user)

    } catch (err) {
        res.status(500).json(err)
    }
});

//get event data

router.get("/getevent", async (req, res) => {

    try {
        Event
            .findOne({ title: 'Deepk Hodda'  })
            .populate('firstname')
            .exec(function (err, event) {
                if (err) return handleError(err);
                res.status(200).json({event})
            });


        // const user = await Person.find();
        // res.status(200).json(user)

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post("/post", async (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const eventsAttended = req.body.eventsAttended;

    // const photo = req.file.filename;
    // const userpost = new User(req.body);

    const newUserData = {
        firstname,
        lastname,
        email,
        eventsAttended

    }
    const newUser = new Person(newUserData);
    try {
        const user = await newUser.save();
        res.status(200).json(user)

    } catch (err) {
        res.status(500).json(err)
    }
});

router.post("/post/event", async (req, res) => {
    const title = req.body.title;
    const location = req.body.location;
    const firstname = req.body.firstname;
    // const eventsAttended = req.body.eventsAttended;

    // const photo = req.file.filename;
    // const userpost = new User(req.body);

    const newEventData = {
        title,
        location,
        firstname,
        

    }
    const newEvent = new Event(newEventData);
    try {
        const event = await newEvent.save();
        res.status(200).json(event)

    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router
