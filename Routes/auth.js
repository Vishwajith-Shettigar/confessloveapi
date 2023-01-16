const router=require('express').Router();
const users = require("../models/users");
const bcrypt = require("bcryptjs");
router.post("/signup",async(req,res)=>{
try{
    console.log("singn up");

    const user = await users.findOne({$or:[ {username: req.body.username},{email:req.body.email}]});
    console.log(user)
if(user){{
    res.status(403).json(403);
    return;
}}

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser =  new users({
        username: req.body.username,
        email: req.body.email,
        password:hashedPassword
  
      });
      const useraa = await newUser.save();
      res.status(200).json(useraa);
    }
    catch(err) {{
        res.status(500).json(500);
    }}

})


router.post("/login",async(req,res)=>{
    try{
        console.log("login up");
    
        const user = await users.findOne({$and:[ {username: req.body.username},{email:req.body.email}]});
        console.log(user)
    if(!user){{
        res.status(403).json(403);
        return;
    }}
    
    
        
    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if(!validPassword)
      {
res.status(400).json(400);
return;
      }

      res.status(200).json(user);
        }
        catch(err) {{
            res.status(500).json(500);
        }}
    
    })
    
module.exports=router;
