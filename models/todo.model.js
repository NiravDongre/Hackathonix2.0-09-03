const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"low"
    },
    deadline:{
        type:Date
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Todo", todoSchema)