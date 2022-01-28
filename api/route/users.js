const router = require("express").Router();
const User = require("../models/User");
const UserLoginSchema = require("../models/userLogin")
const multer = require('multer');
let path = require('path');
const { v4: uuidv4 } = require('uuid');
const jsonwebtoken = require("jsonwebtoken")



//image uploading on server


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  
  
  const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
  }
  
  let upload = multer({ storage, fileFilter });




router.get("/",async (req,res)=>{
    try{
        const user = await User.find();
        res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)
    }
});

//middleware is for verifying token after verifying we can recieve request and response/

const verify = (req,res,next) =>{
    const header = req.headers['x-access-token'];
    if(header){
        jsonwebtoken.verify(header,"secret123",(err,username)=>{
            if(err){
                res.status(500).json({"error":"invalid token"})

            }
            req.username = username;
            next();
        })

    }else{
        res.status(500).json({"error":"invalid token"})

    }
}


//All user userlogin table



router.get("/all",async (req,res)=>{

    const token = req.headers['x-access-token']
  
    try{
        const decode = jsonwebtoken.verify(token,"secret123")
        const username = decode.username
        const user = await UserLoginSchema.find({username:username});
        res.status(200).json(user)
        
    }catch(err){
        res.status(500).json({"error":"invalid token"})
    }
});

//login

router.post("/login",async (req,res)=>{
    try{
        const user = await UserLoginSchema.findOne({
            username:req.body.username,
            password:req.body.password

        });
        if(user){
            const token = jsonwebtoken.sign({
                username:user.username,
                password:user.password
            },"secret123")

           return res.json({user:token,status:"ok"})
            
        }else{
            return res.status(500).json({status:"false",message:"Wrong username password"})

        }
        

    }catch(err){
        res.status(500).json(err)
    }
});



//register

router.post("/register",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    // const photo = req.file.filename;
    // const userpost = new User(req.body);

    const newUserData = {
        username,
        password,
      
    }
      const newUser = new UserLoginSchema(newUserData);
    try{
        const user = await newUser.save();
        res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)
    }
});

router.delete("/deleteuser/:id", async (req, res) => {
    const id = req.params.id
    try {
        // const userpost = await User.findById(req.params._id);

            try {
                await UserLoginSchema.findByIdAndDelete({_id:id})

            //  await userpost.delete();
                res.status(200).json("User has been Deleted");

            } catch (err) {
                res.status(500).json(err);
            }
        
    } catch (err) {
        res.status(500).json(err);
    }

});

router.put("/update/:id", async (req, res) => {
    try {
        
        
            try {
                const updatedUser = await UserLoginSchema.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true}
                );
                res.status(200).json(updatedUser);

            } catch (err) {
                res.status(500).json(err);

            }
       

    } catch (err) {
        res.status(500).json(err);
    }
});



//user table
router.get("/:id",async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
});


//user table
router.post("/post",upload.single('photo'),async (req,res)=>{
    const username = req.body.username;
    const lastname = req.body.lastname;
    const photo = req.file.filename;
    // const userpost = new User(req.body);

    const newUserData = {
        username,
        lastname,
        photo
    }
      const newUser = new User(newUserData);
    try{
        const user = await newUser.save();
        res.status(200).json(user)

    }catch(err){
        res.status(500).json(err)
    }
});

// router.post("/post",async (req,res)=>{
//     const userpost = new User(req.body);
//     try{
//         const user = await userpost.save();
//         res.status(200).json(user)

//     }catch(err){
//         res.status(500).json(err)
//     }
// });

//user table
router.delete("/:id", async (req, res) => {
    try {
        // const userpost = await User.findById(req.params._id);
        
            try {
                await User.findByIdAndDelete(req.params._id)

            //  await userpost.delete();
                res.status(200).json("User has been Deleted");

            } catch (err) {
                res.status(500).json(err);
            }
        
    } catch (err) {
        res.status(500).json(err);
    }
    // try {
    //     const deletedUser = await User.findByIdAndDelete(req.user);
    //     res.json(deletedUser);
    //     } catch (err) {
    //     res.status(500).json({ error: err.message });
    //     }
});


//user table
router.put("/updateuser/:id",upload.single('photo'), async (req, res) => {
    try {
        
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                    $set:{
                        username:req.body.username,
                        lastname:req.body.lastname,
                        photo:req.file.filename

                    }
                },{new:true}
                );
                res.status(200).json(updatedUser);

            } catch (err) {
                res.status(500).json(err);

            }
       

    } catch (err) {
        res.status(500).json(err);
    }
});

//delete user
router.delete("/deletedata/:id", async (req, res) => {
    const id = req.params.id
    try {
        // const userpost = await User.findById(req.params._id);

            try {
                await User.findByIdAndDelete({_id:id})

            //  await userpost.delete();
                res.status(200).json("User has been Deleted");

            } catch (err) {
                res.status(500).json(err);
            }
        
    } catch (err) {
        res.status(500).json(err);
    }

});




module.exports = router;