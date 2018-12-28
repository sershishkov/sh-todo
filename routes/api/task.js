const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


// Load Validation
const validateTaskInput = require('../../validation/task');


// Load task Model
const Task = require('../../models/Task');

// @route   GET api/task/test
// @desc    Tests task route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Task Works' }));


// @route   GET api/task/all
// @desc    Get  tasks from all users
// @access  Public
router.get('/',
  (req, res)=>{
    const errors = {};
    
    Task.find()    
    .then(tasks =>{
      if(!tasks){
        errors.notasks = 'Задач пока нет ';
        return res.status(404).json(errors);
      }
      res.json(tasks);
    })
    .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/task/:id
// @desc    Get  one task
// @access  Public

router.get('/:id',
  (req, res)=>{
    const errors = {};
    Task.findById({_id:req.params.id})    
    .then(task =>{
      if(!task){
        errors.notask = 'Такой задачи нет';
        return res.status(404).json(errors);
      }
      res.json(task);
    })
    .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/task
// @desc    Create task
// @access  Public
router.post('/',
(req,res)=>{
  const { errors, isValid } = validateTaskInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  const newTask = new Task({   
    text:req.body.text,
    status:req.body.status
    
  });

  newTask.save().then(task => res.json(task));
}

);

// @route   PUT api/task
// @desc    Update task
// @access  Public
router.put('/:id',
(req,res)=>{
  const { errors, isValid } = validateTaskInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }
   const updTask ={
    text:req.body.text,
    status:req.body.status,
    
   }

  Task.findOneAndUpdate({_id:req.params.id},{$set:updTask},{new:true})
  .then(task => res.json(task));  
}

);

router.delete('/:id',
(req,res)=>{   

  Task.findByIdAndDelete({_id:req.params.id})
  .then(task => res.json({success:true}));  
}

);


module.exports = router;
