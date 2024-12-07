const express=require('express')
const { reportIssue, getIssues } = require('../controller/issuesController')

const issueRouter=express.Router()

issueRouter.post('/post-issue',reportIssue);

issueRouter.get('/get-issue/:laptopId',getIssues)

module.exports=issueRouter