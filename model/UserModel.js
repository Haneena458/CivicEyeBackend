const mongoose =require('mongoose')

const dataSchema = new mongoose.Schema({
    name : {
        type : String,
        required:true
    },
    phoneNumber : {
        type : String,
        required:true,
        unique : false
    },
    DOB :{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type : String,
        required:true
    },
    state:{
        type:String
    },
    address:{
        type:String
    },
    idProof:{
        type:String
    },
    idNumber:{
        type:String
    },
    type :{
        type: String,
        default:"user"
    }
})

module.exports = mongoose.model("user",dataSchema)