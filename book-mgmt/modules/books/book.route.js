const router = require("express").Router();

router.get("/",(req,res,next)=>{
    try{
        const data = req.body;
        console.log(data);
        res.json({msg:"hello from get book route"});
    }catch(err){
        next(err);
    }
});


router.post("/",(req,res,next)=>{
    try{
        const data = req.body;
        console.log(data);
        res.json({msg:"hello from post blog route"});
    }catch(err){
        next(err);
    }
});


router.put("/:id",(req,res,next)=>{
    try{
        const {id} = req.params;
        const data = req.body;
        console.log(id,data);
        res.json({msg:"hello from put book route"});
    }catch(err){
        next(err);
    }
});


router.patch("/:id",(req,res,next)=>{
    try{
        const {id} = req.params;
        const data = req.body;
        console.log(id);
        console.log(data);
        res.json({msg:"hello from patch book route"});
    }catch(err){
        next(err);
    }
});


router.delete("/:id",(req,res,next)=>{
    try{
        const {id} = req.params;
        res.json({msg:`hello from book id ${id} route is deleted`});
    }catch(err){
        next(err);
    }
});



module.exports = router;