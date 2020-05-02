
const {MongoClient, ObjectID}= require ('mongodb');

const connectionUrl='mongodb://127.0.0.1:27017';
const databaseName='task-manager';


// const id= new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());
// console.log(id.id);
// console.log(`The length of the raw id is ${id.id.length}`);
// console.log(`The length of the string id is ${id.toHexString().length}`);

MongoClient.connect(connectionUrl, { useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log(`There was an error and its details are ${error}`);
    }
    console.log('connected successfully');
    const db = client.db(databaseName);
    
    // db.collection('users').deleteMany({
    //     age:26
    // }).then((res)=>{
    //     console.log(res);
    // }).catch((err)=>{
    //     console.log(err);
    // });
    db.collection('tasks').deleteOne({
        description:'calculation'
    }).then((res)=> {
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
// db.collection('tasks').updateMany({
//     'completed':false
// }, {
//     $set:{
//         completed: true
//     }
// }).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

    // db.collection('users').updateOne({
    //     _id: new ObjectID("5e7c0d230acc1e3980643ba0")
    // },{
    //     $inc:{
    //         age:-5
    //     }
    // } ).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })
    // db.collection('tasks').findOne({_id:new ObjectID('5e7c11cdc23dfc4b78994807')}, (error, result)=>{
    //     if(error){
    //         return console.log(error);
    //     }
    //     console.log(result);
    // })

    // db.collection('tasks').find({completed:false}).toArray((err, res)=>{
    //     if(err){
    //         return console.log(err);
    //     }
    //     console.log(res);
    // })
    // db.collection('users').insertOne({
    //     name:'ahmed',
    //     age:32
    // }, (error,result)=>{
    //       if(error){
    //         return console.log('unable to  insert user');
    //       }
    //       console.log(result.ops);
    // });

    // db.collection('users').insertMany([{ name:'Mahmoud', age:26},{name:'Jen', age:28}], (error, result)=>{
    //     if(error){
    //     return   console.log('Unable to intsert entries');
    //     }
    //     console.log(result.ops);
    // })
    // db.collection('tasks').insertMany([{ description:'Node Course', completed:false},
    // {description:'calculation', completed:false},{description:'reading', completed:true}], (error, result)=>{
    //     if(error){
    //     return   console.log('Unable to intsert entries');
    //     }
    //     console.log(result.ops);
    // })
})
