const express = require('express');
const app = express();
const mongoose=require('mongoose')
const route=require("./route")
const dotenv=require("dotenv")
app.use(express.json());

dotenv.config()
mongoose.connect(process.env.mongourl,{
 
  
  }).then(()=>{
    console.log("succesfull")
  }).catch((err)=>console.log(err))
  









  

app.use("/route",route)


const port = 3000; // You can use any port number you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
