const mongoose=require('mongoose')

const MaintenanceSchema=new mongoose.Schema({

    loptopId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Laptop'
    },
    description:{
        type:String,
        required:true
    },
    cost:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['available','assigned','maintenance'],
        required:true
    },
    loggedAt:{
        type:Date
    }
})

module.exports=mongoose.model('mintenance',MaintenanceSchema)