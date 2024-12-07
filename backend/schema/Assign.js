const mongoose=require('mongoose')

const AssignSchema=new mongoose.Schema({

    laptopId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Loptop',
       required:true
    },
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
       ref:'Employee',
       required:true
        
    },
    assignedAt:{
         type:Date,
         default:Date.now
    },
    
    returnedAt:{ type: Date, default: null }
},{timestamps:true})

module.exports=mongoose.model('assign',AssignSchema)