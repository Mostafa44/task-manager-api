const mongoose= require('mongoose');
const validator= require('validator');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const Task= require('./task');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number');
            }
        }
    },
    email:{
        type:String,
        optional:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('The email is not valid');
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password field should not contain the word password");
            }
        }
    },
   
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
}
);
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
});
userSchema.methods.toJSON= function(){
    const user= this;
    const userObject= user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;

}
userSchema.methods.generateAuthToken= async function(){
    const user= this;
    const token =  jwt.sign({_id:user._id.toString()}, process.env.JWT_SECRET);
    //console.log(token);
    user.tokens=user.tokens.concat({token});
    console.log(user);
    await user.save();
    console.log(token);
    return token;
};
userSchema.statics.findByCredentials= async (email, password)=>{
    const user= await User.findOne({email});
    if(!user){
        throw new Error('Unable to Login');
    }
    const isMatch= await bcrypt.compare(password, user.password);
    if (!isMatch){
        throw new Error('Unable to Login ');
    }
    return user;
}

//save in the paramaters here is the event
userSchema.pre('save', async function(next){
    const user= this;
   
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8);
    }
    //this would indicate that this specific function has finished and we are to continue with the next 
    next()
})

//Delete tasks of the user before removing the user 
userSchema.pre('remove', async function(next){
    const user= this;
    await Task.deleteMany({owner:user._id});
    next();
})
const User = mongoose.model('User',userSchema );
module.exports= User;