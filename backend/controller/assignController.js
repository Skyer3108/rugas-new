
const AssignSchema=require('../schema/Assign');
const Employee=require('../schema/Employee');
const Laptop=require('../schema/Loptops')


const assignLaptoptoEmp=async(req,res)=>{

    try{

        const {laptopId,employeeId}=req.body;


        const laptop=await Laptop.findById(laptopId)

        if(!laptop){

            res.send({
                status:404,
                message:'Laptop not Found'
            })
        }

        if(laptop.status!=='available'){
            return res.send({
                status:400,
                message:'Laptop is not Available for Assign'
            })
        }


        const employee=await Employee.findById(employeeId);

        if(!employee){
            res.send({
                status:404,
                message:'Employee not Found'
            })
        }

        const newAssign=new AssignSchema({
             laptopId,
            employeeId,

        })

        await newAssign.save()

        laptop.status='assigned',

        await laptop.save()

        return res.send({
            status:200,
            message:'Laptop Assigned to employee Successfully',
            data:newAssign
        })
        
    }catch(err){

        res.send({
            status:400,
            message:"Error Assign Laptop",
            err:err.message

        })
    }
}


const fetchLaptopsAssignToEmployee=async(req,res)=>{
   
    const {employeeId}=req.params;
    
    try{
        const assignments=await AssignSchema.find({employeeId}).populate( {path: 'laptopId',
            model: 'loptop'}).exec()
console.log("grg",assignments)
        if(assignments.length==0){
            return res.send({
                status:404,
                message:"No laptops assigned to this employee"
            })
        }

        return res.send({
            status:200,
            message:'Laptops assigned to employee fetched successfully',
            data:assignments
        })


    }catch(err){
        console.log(err)
        res.send({

        })
    }
}


module.exports={assignLaptoptoEmp,fetchLaptopsAssignToEmployee}