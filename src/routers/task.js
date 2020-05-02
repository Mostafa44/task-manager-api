const express= require('express');
const router = new express.Router();
const Task= require('../models/task');
const auth= require('../middleware/auth');



router.post('/tasks', auth,async (req, res)=>{
   
    try {
        const task= new Task(req.body);
        task.owner= req.user._id
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
    // task.save().then(()=>{
    //     res.status(201).send(task);
    // }).catch((err)=>{
    //     res.status(400).send(err);
    // })
})

//GET tasks?completed=true
//GET tasks?limited=2&skip=2
//Get tasks?sortBy=createdAt:desc
router.get('/tasks', auth,async (req, res)=>{
    const match={};
    const sort={};
    if(req.query.completed){
        match.completed= req.query.completed==='true';
    }
    if(req.query.sortBy){
            const parts= req.query.sortBy.split(':');
            sort[parts[0]]= parts[1]==='desc'? -1:1;
    }
    try {
       // const tasks= await Task.find({owner:req.user._id});
       await req.user.populate({
           path:'tasks',
           match,
           options:{
               limit: parseInt(req.query.limit),
               skip: parseInt(req.query.skip),
               sort
           }
       }).execPopulate();
        res.send(req.user.tasks);
    } catch (error) {
        res.status(500).send(error);
    }
    // Task.find({}).then((tasks)=>{
    //     res.status(201).send(tasks);
    // }).catch((err)=>{
    //     res.status(500).send();
    // });
})

router.get('/tasks/:id', auth,async (req, res)=>{
    const _id= req.params.id;
    try {
        const task= await Task.findOne({_id, owner:req.user._id});
        if(!task){
                       return  res.status(404).send();
                }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
    // Task.findById(_id).then((task)=>{
    //         if(!task){
    //            return  res.status(404).send();
    //         }
    //         res.send(task);
    // }).catch((err)=>{
    //     res.status(500).send(err);
    // })
})


router.patch('/tasks/:id', auth,async(req, res)=>{
    
    const updates= Object.keys(req.body);
    const allowedUpdates= ['description', 'completed'];
    const isAllowedOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    });
    if(!isAllowedOperation){
        return res.status(400).send({error:'Invalid Update Fields'});
    }
    try {
        const task =await Task.findOne({_id:req.params.id, 
                                           owner: req.user._id});
        if(!task){
            return res.status(404).send();
        }
        updates.forEach((update)=>{
            task[update]= req.body[update];
        });
        await task.save();
         
        res.send(task);
    } catch (error) {
        res.status(400).send(error);
    }
})


router.delete('/tasks/:id', auth,async(req, res)=>{
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
})

module.exports= router;