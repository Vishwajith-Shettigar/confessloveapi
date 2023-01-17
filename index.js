const express=require('express');
const app= express();
const mongoose=require("mongoose");
const authroute= require('./Routes/auth');
const conroute=require('./Routes/confession')
const cors=require("cors");
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




app.use(cors());

app.use(express.json());



app.use("/api/auth",authroute);
app.use("/api/confession",conroute);

app.listen(5000,()=>{

    console.log("running..")
})