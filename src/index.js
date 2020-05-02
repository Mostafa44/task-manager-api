const express= require('express');
//we do not any thing from it , but by running the below statement we are making sure that the file is getting run
require('./db/mongoose.js');

// const Task= require('./models/task');
const app= express();
const userRouter= require('../src/routers/user');
const taskRouter= require('./routers/task');

const port= process.env.PORT ;

//trying to do somthing before the routes handlers got executed
// app.use((req, res, next)=>{
//     console.log('Under Maintenance');
//     res.status(503).send("Currently the App is under Maintenance");
    
// })
//In order to be able to parse json in the body of the requests
app.use(express.json());
//routers
app.use(userRouter);
app.use(taskRouter);
// const multer = require('multer');
// const upload = multer({
//     dest:'uploads/'
// })
// app.post('/upload', upload.single('picture'), (req, res)=>{
//     res.send('uploaded');
// })
// const pet={
//     name:'Garfield',
//     age:'5'
// }

// pet.toJSON=function(){
//     // console.log(this);
// //    return this;
// return {}
// }
// console.log(`direct call to the whole object${JSON.stringify(pet)}`);
// const Task= require('./models/task');
// const User= require('./models/user');
// const main= async()=>{
//     // const task=await  Task.findById('5e90b08c7a44cb51545ea853');
//     // await task.populate('owner').execPopulate(); 
//     // console.log(`the user is ${task.owner}`);
//     const user= await User.findById('5e905ac2326b514f6c998049');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }
// main();
app.listen(port, ()=>{
    console.log(`Server is listening to port ${port}`);
});