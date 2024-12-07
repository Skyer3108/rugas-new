const EmployeeSchema=require('../schema/Employee')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const validator = require('validator');


const createToken=(id,role)=>{

    return jwt.sign({id,role},process.env.JWT_SECRET)

}


const registerEmp=async(req,res)=>{
  const {name,email,password,department,role}=req.body;
try{

    
    const emailExists=await EmployeeSchema.findOne({email})

    
  if(emailExists){
    return res.send({
        status:400,
        message:'Email already Exists'
    })
  }

  if(!validator.isEmail(email)){
    return res.send({
       status:400,
       sucess:false,
       message:'Please enter a valid email'
   })
}
console.log('kkk')


const salt= await bcrypt.genSalt(10)

const hashedPassword=await bcrypt.hash(password,salt)


  const newEmp=new EmployeeSchema({
    name:name,
    email:email,
    password:hashedPassword,
    department,
    role,

  })
  const User=await newEmp.save()

  const token=createToken(User._id,User.role)

  return res.send({
      status:200,
      id:User._id,
      token:token,
      role:User.role,

  })
}catch(err){
    console.error('Error during registration:', err);
    return res.send({
        sucess:false,
        message:'Error on Registering'
    })

}
  
}


const loginEmp=async(req,res)=>{

    const {email,password}=req.body
    try{

        const user=await EmployeeSchema.findOne({email})

        if(!user){

           return res.send({
                status:400,
                message:'Invalid email or Password'
            })

        }

        const isValidPassword=await bcrypt.compare(password,user.password)

        if(!isValidPassword){
           return res.send({
                   status:400,
                message:'Invalid email or Password'
            })
        }

        const token=createToken(user._id,user.role)

       return res.send({
            status:200,
            id:user._id,
            message:'Login Sucessfully',
            token:token,
      role:user.role

        })


    }catch(err){

        res.send({
            status:400,
            message:'Loggin Error',
            err
        })
    }
}


const getAllEmployees=async(req,res)=>{
    try{

        const employees=await EmployeeSchema.find({},'-password');

        res.send({
            status:200,
            data:employees
        })


    }catch(err){

        return res.send({
            status:500,
            message:'Failed to get the Employees'
        })

    }
}




module.exports={registerEmp,loginEmp,getAllEmployees}