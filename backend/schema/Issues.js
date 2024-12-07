const mongoose=require('mongoose')

const IssueSchema=new mongoose.Schema({

    laptopId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    priority:{ type: String,
         enum: ['low', 'medium', 'high'], 
        default: 'medium' },
    status: { type: String, 
        enum: ['reported', 'in-progress', 'resolved'],
         default: 'reported' },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'employee',
         required: true },
    reportedAt:{
     type:Date,
     default:Date.now
    }
},{timestamps:true})

module.exports=mongoose.model('issues',IssueSchema)
