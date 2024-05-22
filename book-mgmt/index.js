require("dotenv").config();
const express = require("express");
const morgan = require("morgan");


const app = express();
const PORT = Number(process.env.PORT);
const indexRouter = require("./routes");


app.use(express.json());
app.use("/assets",express.static("public"));
app.use(morgan("dev"));
app.use("/",indexRouter);

app.use((err,req,res,next)=>{
    err = err? err.toString():"something went wrong";
    res.status(500).json({msg:err});
})


app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}.url is http://localhost:${PORT}`);
});