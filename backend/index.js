const express=require('express')
const cors=require('cors')
const app=express();
const dotenv=require('dotenv')
dotenv.config()
const db=require('./db');
const empRouter = require('./routes/employeeRoute');
const loptopRouter = require('./routes/loptopRoute');
const issueRouter = require('./routes/issuesRoute');
const maintenanceRouter = require('./routes/maintenanceRouter');
const assignRouter = require('./routes/assignRouter');


const PORT=process.env.PORT||5000;
app.use(express.json())
app.use(cors())

app.use('/api/user',empRouter)
app.use('/api/laptop',loptopRouter)

app.use('/api/issues',issueRouter)
app.use('/api/maintain',maintenanceRouter)
app.use('/api/assign',assignRouter)

app.listen(PORT,()=>{
    console.log(`PORT WAS RUNNING AT ${PORT}`)
    
})