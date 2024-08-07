const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    phone:{
        type:Number,
    },
    expenses:[
        {
            type:Schema.Types.ObjectId,
            ref:"Expense"
        }
    ]
})
userSchema.plugin(passportLocalMongoose);

const User=mongoose.model('User',userSchema);
module.exports=User;