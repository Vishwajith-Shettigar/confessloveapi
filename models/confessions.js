const mongoose=require("mongoose");

const confessionSchema=mongoose.Schema({

    username:{
        type:String,
        require:true,
        min:3,
        max:20,
        unique:true



    
    },
    text:{
        type:String,
        require:true


    }

   
},
{timestamps:true}
)


module.exports=mongoose.model("confessions",confessionSchema)