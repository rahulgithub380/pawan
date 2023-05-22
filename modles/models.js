const mongoose = require('mongoose');
const validator= require('validator')
const scheema= new mongoose.Schema({
    name:String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    phoneNo:{ 
    type:Number,
    unique: true,
    required:true
    },
    password:{
        type:String,
   
        required:true
    },
    token: {
        type:String,
        default:[]
    }
});
const Models = mongoose.model('emp_details',scheema);

module.exports= {Models}