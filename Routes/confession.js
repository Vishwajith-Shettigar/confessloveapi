const router=require('express').Router();
const confessions = require("../models/confessions");


//save confession
router.post("/save",async (req,res)=>{
 
console.log(";lllll")
    try{

        const savecon= new confessions({
            "username":req.body.username,
            "text":req.body.text,
            "theme":req.body.theme
        }) 

        const result = await savecon.save();

 res.status(200).json(200);
    }
    catch(e){{
        res.status(500).json(500);
    }}
   


})

//get confession

router.get("/get",async (req,res)=>{

    console.log(req.body)
    try{
        const cons=await confessions.find({username:req.query.username});
console.log(cons)
        res.status(200).json(cons)
    }
    catch(e){
        res.status(500).json(500)
    }
})

module.exports=router;