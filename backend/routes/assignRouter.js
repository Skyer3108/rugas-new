const express=require('express')

const { fetchLaptopsAssignToEmployee, assignLaptoptoEmp } = require('../controller/assignController')

const assignRouter=express.Router()

assignRouter.post('/assign-emp',assignLaptoptoEmp)

assignRouter.get('/assign-emp/:employeeId/laptops',fetchLaptopsAssignToEmployee)

module.exports=assignRouter