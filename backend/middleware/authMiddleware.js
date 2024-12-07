

const jwt=require('jsonwebtoken')

const Employee=require('../schema/Employee')


const authProtector=async(req,res,next)=>{


let token;

if(req.headers.authorization&& req.headers.authorization.startWith('Bearer')){

    try{
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Employee.findById(decoded.id).select("-password");
        next();
    }catch(err){
        res.send({
            status:401,
            message:'Not authorized,token failed'
        })
    }
}
else{
    res.send({
        status:401,
            message:'Not authorized,no failed'
    })
}
}

const admin=(req,res,next)=>{


    if(req.user&&req.user.role==='admin'){

        next()

    }else{
    res.send({
        status:403,
        message:'Not authorized as Admin'
    })
    }
}

module.exports={admin,authProtector}