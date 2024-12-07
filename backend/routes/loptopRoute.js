const express=require('express')
const { addLoptop, getLoptop, updateLoptop, deleteLoptop } = require('../controller/loptopController')

const loptopRouter=express.Router()

loptopRouter.post('/post-loptop',addLoptop)
loptopRouter.get('/get-loptop',getLoptop)
loptopRouter.put('/:id',updateLoptop)
loptopRouter.delete('/:id',deleteLoptop)
module.exports=loptopRouter