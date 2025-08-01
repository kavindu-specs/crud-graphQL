const mongoose = require("mongoose");


const connectDB=async ()=>{

   try{
      mongoose.set('strictQuery', true);
      const conn =  await mongoose.connect(process.env.MONGO_URI,{
   // useNewUrlParser:true
      })
     console.log(`mongoDB connected: ${conn.connection.host}`)
   }catch(err){
      console.log(err)
   }
}

module.exports = connectDB;