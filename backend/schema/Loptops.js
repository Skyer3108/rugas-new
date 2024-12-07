const mongoose=require('mongoose')

const LoptopSchema=new mongoose.Schema({


   
    brand:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    serialno:{
        type:String,
        unique:true
    },
    status:{
        type:String,
        enum:['available','assigned','maintenance'],
        default:'available'
    },
    purchaseData:{
        type:Date
    }
})

module.exports=mongoose.model('loptop',LoptopSchema)