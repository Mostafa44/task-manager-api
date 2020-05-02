require('../src/db/mongoose');
const User= require('../src/models/user');

// User.findByIdAndUpdate('5e83f8b76904e536846284a3', {age:1}).then((user)=>{
//     console.log(user);
//     return User.countDocuments({age:1})
// }).then((res)=>{
//     console.log(res);
// }).catch((e)=>{
//     console.log(e);
// })

const updateAndGetCount= async(id, age)=>{
    const user= await User.findByIdAndUpdate(id, {age});
    const count= await User.countDocuments({age});
    return count;
}
updateAndGetCount('5e83f8b76904e536846284a3', 2).then((result)=>{
    console.log(result);
}).catch((e)=>{
    console.log(e);
});