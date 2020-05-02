const express= require('express');
const router= new express.Router();
const auth= require('../middleware/auth');
const User= require('../models/user');
const {sendWelcomeEamil,sendCancelEmail} = require('../emails/account');
const multer = require('multer');
const sharp = require('sharp');
const upload= multer({
    // dest:'images/',
    limits:{
        fileSize:1000000,
    },
        fileFilter (req, file,cb ){
            if(!file.originalname.match(/\.(jpg| jpeg|png)$/)){
                  return  cb(new Error('Please upload a proper image file'));
            }
            cb (undefined, true);
        }
    
});


router.post('/users/login', async(req, res)=>{
    try {
        const user =  await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        //console.log(`inside the router where the token was got from previous step is ${token}`);
        res.send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post('/users/logout', auth, async(req, res)=>{
    try {
       req.user.tokens= req.user.tokens.filter((token)=>{
           return token.token !== req.token
       })
       await req.user.save();
       res.send('logged out successfully');
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/users/logoutAll', auth, async(req, res)=>{
    try {
        req.user.tokens=[];
        await req.user.save();
        res.send()
    } catch (error) {
        res.status(500).send(error);
    }
})
router.post('/users',async (req, res)=>{
    // res.send('testing');
    // console.log(req.body);
    const user= new User(req.body);
    try {
        await user.save();
        sendWelcomeEamil(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((err)=>{
    //     res.status(400).send(err);
    // });
});

router.get('/users/me', auth,async (req, res)=>{

    res.send(req.user);
    // try {
    //     const users= await User.find({});
    //     res.send(users);
    // } catch (error) {
    //     res.status(500).send(error);
    // }
    //  User.find({}).then((users)=>{
    //    res.send(users);
    // }).catch((err)=>{
    //     res.status(500).send(err);
    // })
})
//No user should be able to fetch the data of another user  by Id,
// so the whole method should be deleted instead i have commented it out

// router.get('/users/:id', async (req, res)=>{
//     const _id=req.params.id;
  
//   try {
//     const user= await User.findById(_id);
//         if(!user){
//              return res.status(404).send();
//          }
//     res.send(user);
//   } catch (error) {
//       res.status(500).send();
//   }
    //  User.findById(_id).then((user)=>{
    //      if(!user){
    //          return res.status(404).send();
    //      }
    //      res.send(user);
    //  }).catch((err)=>{
    //      res.status(500).send(err);
    //  })
//})
router.patch('/users/me',auth, async(req, res)=>{

    const updates= Object.keys(req.body);
    const allowedUpdates= ['name', 'email', 'password', 'age'];

    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid values to be updated'});
    }
    try {
        updates.forEach((update)=>{
           req.user[update]= req.body[update];
        })
        await req.user.save();
       res.send(req.user);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/users/me',auth, async(req, res)=>{
    try {
        // const user = await User.findByIdAndDelete(req.params.id);
        // if(!user){
        //     return res.status(404).send();
        // }
        // res.send(user);
        await req.user.remove();
        sendCancelEmail(req.user.email, req.user.name);
        return res.send(req.user);
    } catch (error) {
        res.status(500).send(error);
    }
})

router.post('/users/me/avatar',auth, upload.single('avatar'),async(req, res)=>{
    req.user.avatar= await sharp(req.file.buffer).resize({width:250, height:250}).png().toBuffer();
    await req.user.save();
    res.send('uploaded');
},(error, req, res, next)=>{
    res.status(400).send({error: error.message});
})
router.delete('/users/me/avatar', auth, async(req, res)=>{
    req.user.avatar= undefined;
    await req.user.save();
    res.send('deleted successfully');
})
router.get('/users/:id/avatar', async(req, res)=>{
    try {
    const user= await User.findById(req.params.id);
    if(!user || !user.avatar){
        throw new Error();
    }
    res.set('Content-Type', 'image/jpg');
    res.send(user.avatar);
    } catch (error) {
        res.status(400).send();
    }
})
module.exports = router;