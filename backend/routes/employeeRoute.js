const express=require('express')
const { registerEmp, loginEmp, getAllEmployees } = require('../controller/empController')

const empRouter=express.Router()


empRouter.post('/register',registerEmp)
empRouter.post('/login',loginEmp)
empRouter.get('/getallemployees',getAllEmployees)

module.exports=empRouter