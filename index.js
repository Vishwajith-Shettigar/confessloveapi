const express=require('express');
const app= express();
const mongoose=require("mongoose");
const authroute= require('./Routes/auth');


try{

mongoose.connect("mongodb://localhost:27017/confesslove",{

    useNewUrlParser:true,
    useUnifiedTopology:true

},()=>{

    console.log("db    connected")
})
}
catch(e){

}






app.use(express.json());



app.use("/api/auth",authroute);

app.listen(5000,()=>{

    console.log("running..")
})