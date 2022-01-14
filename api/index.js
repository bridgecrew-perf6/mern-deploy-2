const express = require('express')
const app = express();
const cors = require("cors");
const port = 5000
const dotenv = require("dotenv");
const mongoose = require("mongoose");


const userRoute = require("./route/users");
const dbRoute = require("./route/db");


dotenv.config();

app.use(express.json());


// app.use("/images",express.static(path.join(__dirname,"/images")))

app.use(cors({ origin: true, credentials: true }));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(console.log("connected to mongo")).catch(err => console.log(err));




// app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/db",dbRoute);
// app.use("/api/posts",postRoute);
// app.use("/api/categories",categoryRoute);


const user = [
  {
    id:"1",
    username:"Mihir",
    password:"123",
    isAdmin:"true"

  },
  {
    id:"2",
    username:"Shubham",
    password:"321",
    isAdmin:"false"

  },
  
]

app.use("/",(req,res)=>{
  console.log("main url")
}) 



app.listen(port, () => {
  console.log(`Backend is listening at http://localhost:${port}`)
});