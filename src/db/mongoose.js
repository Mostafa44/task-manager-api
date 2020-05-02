const mongoose= require('mongoose');
//const validator= require('validator');
mongoose.connect(process.env.MONGODB_URL, 
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