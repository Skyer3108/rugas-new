
const express=require('express');
const { addMaintenance, viewMaintenanceHistory } = require('../controller/maintenanceController');
const Maintenance = require('../schema/Maintenance');

const maintenanceRouter=express.Router();


maintenanceRouter.post('/maintenance',addMaintenance);
maintenanceRouter.get('/maintenance/:laptopId',viewMaintenanceHistory)

module.exports=maintenanceRouter