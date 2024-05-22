const Joi = require("joi");

const Schema = Joi.object({
    title:Joi.string().required(),
    author:Joi.string().required(),
    content:Joi.string(),
    tags:[Joi.string()],
    words:Joi.number(),
    status:Joi.string(),
});

const validate = (req,res,next)=>{
    const {error,value} = Schema.validate(req.body);
    if(error){
        res.status(400).json({msg:error.details[0].message});
    }else{
        next();
    }
};


module.exports = {validate};