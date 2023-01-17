const mongoose=require("mongoose");

const confessionSchema=mongoose.Schema({

    username:{
        type:String,
        require:true,
       



    
    },
    text:{
        type:String,
        require:true


    },
    theme:{
        type:String,
        require:true,
        default:"eight"
    }

   
},
{timestamps:true}
)


module.exports=mongoose.model("confessions",confessionSchema)