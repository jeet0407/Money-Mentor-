const {expenseSchema,userSchema}=require('../serverSchema.js');
const errors=require('../utils/error.js');

const auth=(req,res,next)=>{
    if(req.isAuthenticated()) {
        return next();
    }
    else{
        req.flash('error','Login/Signup Required!')
        res.redirect('/login');
    }
}

const validateUser=(req,res,next)=>{
    let {error}=userSchema.validate(req.body);
    if(error){
        let allmsg = error.details.map((obj) => obj.message).join(" ");
        throw new errors(400, allmsg);
    }
    else return next();
}

const validateExpense=(req,res,next)=>{
    let {error}=expenseSchema.validate(req.body);
    if(error){
        let allmsg = error.details.map((obj) => obj.message).join(" ");
        throw new errors(400, allmsg);
    }
    return next();
}

module.exports={auth,validateUser,validateExpense};