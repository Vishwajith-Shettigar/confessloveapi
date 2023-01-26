const express=require('express');
const app= express();
const mongoose=require("mongoose");
const authroute= require('./Routes/auth');
const conroute=require('./Routes/confession')
const cors=require("cors");
try{

mongoose.connect("mongodb+srv://vish:Zekrom9740@cluster0.k5pane6.mongodb.net/?retryWrites=true&w=majority",{

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


app.get("/",(req,res)=>{

    res.status(200).json("hello")
})
app.use("/api/auth",authroute);
app.use("/api/confession",conroute);

// app.listen( process.env.PORT || 5000,()=>{

//     console.log("running..")
// })

module.exports=app
