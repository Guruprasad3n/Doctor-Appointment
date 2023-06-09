const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// listen Port
const Port = process.env.PORT;

/// for Deployment
const path = require("path")
// const path = require("./frontend/build/")

// dotenv config
dotenv.config();
// dbConnect()

// mongo Connectin``
const connectDB = require("./config/db");
connectDB();
// rest object
const app = express();


// middlewares
app.use(cors({origin:'*'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// routes
const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/DocRoute");

app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/doctor", doctorRoute);


// For Deployment Static FIle From Build or Public
// app.use(express.static(path.join(__dirname, "./frontend/build")))
// app.get("*", function(req, res){
// res.sendFile(path.join(__dirname, "./frontend/build/index.html"))
// });
// -----------------------------






// listen
// app.listen(Port, async( (req, res) => {
//   console.log(`Server Runnning in http://localhost:${Port}`);
// }));

app.listen(Port, async()=>{
  try{
    await connectDB
    console.log("connected")
    console.log(`Server Runnning in http://localhost:${Port}`)
  }
  catch(e){
console.log(e)
  }
})