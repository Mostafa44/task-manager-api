const mongoose= require('mongoose');
//const validator= require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', 
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
});



// const courseTask= new Task({
//     description:'Standard Calculation',   
// });
// courseTask.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })

// const me= new User({
//     name:'Ahmed      ',
//     email:'ahmed@abc.com',
//     password:'123'
// });
// me.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })