require('../src/db/mongoose');
const Task= require('../src/models/task');

// Task.findByIdAndDelete('5e7fb2d095015e242c1803e2').then(()=>{

//     return Task.countDocuments({completed:false});
// }).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })
const deleteAndCount= async(id, completed)=>{
    const task= await Task.findByIdAndDelete(id);
    const count= Task.countDocuments({completed});
    return count;
}
deleteAndCount('5e81967e06ca993e784b8437', false).then((res)=>{
    console.log(res);
}).catch((e)=>{
    console.log(e);
})