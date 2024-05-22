const router = require("express").Router();

router.get("/",(req,res,next)=>{
    try{
        res.json({msg:"hello from tag get route"});
    }catch(err){
        next(err);
    }
});




module.exports = router;