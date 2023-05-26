// mongodb://127.0.0.1:27017/
const mongoose = require("mongoose");


const connectDB =async()=>{
try{
await mongoose.connect(process.env.MONGO_URL)
console.log(`Mongo DB Connected ${mongoose.connection.host} `)
}catch(e){
console.log(e+"Mongo Error")
}
}
module.exports = connectDB
// mongoose.connect(process.env.MONGO_URL, ((err)=>{
//     if(!err){
//         console.log("DB COnnected")
//     }
// }))