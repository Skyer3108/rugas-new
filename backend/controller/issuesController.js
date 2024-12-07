
const Issues=require('../schema/Issues')
const Laptop=require('../schema/Loptops')
const Employee=require('../schema/Employee')



const reportIssue=async(req,res)=>{
  const {laptopId, description, priority,reportedBy}=req.body

  try{
    const laptop = await Laptop.findById(laptopId);
    if (!laptop) {
      return res.status(404).json({ error: 'Laptop not found' });
    }

    
    const employee = await Employee.findById(reportedBy);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }


    const newIssue = new Issues({
        laptopId,
        description,
        priority,
        status:'reported',
        reportedBy,
        reportedAt:new Date()
      });

      const data=await newIssue.save()

      res.send({
        status:200,
        message:'Issues Reported',
        data
      })
  }catch(err){

    res.send({
        status:400,
        error:err,
        message: 'Error reporting the issue',
    })
   
  }


}

const getIssues=async(req,res)=>{
  const {laptopId}=req.params
    try{

      const issues=await Issues.find({laptopId}).populate('reportedBy','name email').exec()

      console.log(issues)

  if(issues.length==0){

    res.send({
      statsu:404,
      message:'No issues reported for this laptop'
    })

  }

  return res.send({
    statsu:200,
    message:"Issues fetched Successfully",
    data:issues
  })
        
    }catch(err){
      console.log(err)
        res.send({
            status:400,
            message:'Error to get the Issues'
        })
    }

}

module.exports={reportIssue,getIssues}