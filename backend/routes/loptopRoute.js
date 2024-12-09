const express=require('express')
const { addLoptop, getLoptop, updateLoptop, deleteLoptop } = require('../controller/loptopController')
const { authProtector, admin } = require('../middleware/authMiddleware')

const loptopRouter=express.Router()

loptopRouter.post('/post-loptop',authProtector,admin,addLoptop)
loptopRouter.get('/get-loptop',authProtector,admingetLoptop)
loptopRouter.put('/:id',authProtector,admin,updateLoptop)
loptopRouter.delete('/:id',authProtector,admin,deleteLoptop)
module.exports=loptopRouter