
const MaintenanceSchema=require('../schema/Maintenance')

const Loptop=require('../schema/Loptops')

const addMaintenance=async(req,res)=>{


    try{

        const {laptopId, description,status, cost }=req.body

      const laptop=await Loptop.findById(laptopId)

      if(!Loptop){
        res.send({
            status:404,
            message:'Loptop not found'
        })
      }


      const maintenance=new MaintenanceSchema({
        laptopId, description, cost ,status, loggedAt:new Date()
      })

      const data=await maintenance.save()
      laptop.status='maintenance';

      await laptop.save()

      res.send({
        status:201,
        message:'Maintenance log added'
      })

    }catch(err){

        res.send({
            status:400,
            message:'Maintenance Error'
        })
    }
}


const viewMaintenanceHistory=async(req,res)=>{
   const {loptopId}=req.params
  try{

    const maintenanceHistory=await MaintenanceSchema.find({loptopId})
    console.log(maintenanceHistory.length)

    if(maintenanceHistory.length===0){
      return res.send({
        status:404,
        message:'No maintenance History found for laptops'
      })
    }

    res.send({
      status: 200,
      message: 'Maintenance history fetched successfully',
      data: maintenanceHistory,
    })

  }catch(err){
    console.log(err)
    res.send({
      status:400,
      message:'View Maintenance Error'
    })
  }
}
module.exports={addMaintenance,viewMaintenanceHistory}