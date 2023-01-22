const router=require('express').Router();
const users = require("../models/users");
const confessions = require("../models/confessions");
const bcrypt = require("bcryptjs");
router.post("/signup",async(req,res)=>{
try{
    console.log("singn up");

    const user = await users.findOne({$or:[ {username: req.body.username},{email:req.body.email}]});
   
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
    
        const user = await users.findOne({"email":req.body.email});
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


router.post("/getuser",async(req,res)=>{

try{
    const username=await users.findById(req.body.id);
    if(!username)
    {
return res.status(403).json(403);

    }
    return res.status(200).json(username);
}
catch(err)
{
    return res.status(500).json(500);

}

})

router.post("/getwriteuser",async(req,res)=>{

    try{
        const username=await users.findOne({"username":req.body.username});
        if(!username)
        {
    return res.status(403).json(403);
    
        }
        return res.status(200).json(username);
    }
    catch(err)
    {
        return res.status(500).json(500);
    
    }
    
    })

router.post("/updateprofile",async(req, res)=>{

    try{

        const user = await users.findOne({"username": req.body.userinfo.username});
   
        if(user){{
            res.status(403).json(403);
            return;
        }}

        console.log(req.body.id)
        const oldusernames = await users.findById(req.body.id);
const result= await users.findByIdAndUpdate(req.body.id,req.body.userinfo);
console.log(oldusernames.username);

const conv=await confessions.updateMany(
    {
        username:oldusernames.username
      },
    {
        $set:
        {
            username:req.body.userinfo.username
          }
      }
      )

console.log("------------")
res.status(200).json(result);
console.log(result)
    }catch(err){
        res.status(500).json(500);
        console.log("errr")
    }

})
    

// work

router.post("/resetpass",async(req,res)=>{

    try{
        console.log("-------")
        console.log(req.body.id)
console.log(req.body.id, req.body.oldpassword,req.body.password)
        const user = await users.findById(req.body.id);
        const validPassword = await bcrypt.compare(
            req.body.oldpassword,
            user.password
          );
          if(!validPassword)
          {
           
return res.status(403).json(403)
          }
          const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const result= await users.findByIdAndUpdate(req.body.id,{"password":hashedPassword});
            return res.status(200).json(200)


    }catch(err){{

        return res.status(500).json(500)
    }}
})

module.exports=router;
