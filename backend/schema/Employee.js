const mongoose=require('mongoose')

const EmployeeSchema=new mongoose.Schema({


    
   
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['admin','employee'],
        default:'employee'
    }
  
})

module.exports=mongoose.model('employee',EmployeeSchema)