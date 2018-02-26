const express = require('express');

const router = express.Router();

const Todo = require('../models/todo')



router.get('/todos',(req,res, next)=>{
    Todo.find({}).then(todo=>{
        res.send(todo)
    })
})

router.post('/todos',(req,res, next)=>{
    Todo.create(req.body).then((todo)=>{
        res.send(todo);

    }).catch(next)
})
router.delete('/todos/:id',(req,res, next)=>{
    Todo.findByIdAndRemove({_id: req.params.id}.then(todo => res.send(todo)))
    res.send({type: 'DELET'});
})


module.exports = router