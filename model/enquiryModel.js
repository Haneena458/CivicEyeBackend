const mongoose = require("mongoose")

const enquirySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
        message:{
        type:String,
        required:true
    },
    reply:{
        type:String,
    },
    enquiredBy:{
        type:String
    }
})

module.exports = mongoose.model("enquiry",enquirySchema)