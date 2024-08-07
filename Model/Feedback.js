const mongoose=require('mongoose');

const feedbackSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        enum:['bug','feature','other','general']
    },
    message:{
        type:String
    },
})

const FeedBack=mongoose.model('Feedback',feedbackSchema);
module.exports=FeedBack;