const express= require('express');
 const app=express();
 const multer=require('multer')
 

 app.use(express.static("./"))

 app.get("/",(req,res)=>{
    res.sendFile("index.html")
 })

//  const fileStorageEngine=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'./images')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+'--'+file.originalname)
//     }
//  });

//  const upload=multer({
//     storage:fileStorageEngine
//  });

//  app.post("/single",upload.single('image'),(req,res)=>{
//     console.log(req.file);
//     res.send("Single file upload success")
//  });

 const mnRouter=require('./backend')
 app.use('/backend',mnRouter);

 const port =process.env.PORT||5000;
app.get("/test",(req,res)=>{
    res.send("Server is running");
})


app.use("*",(req,res,next)=>{
    res.status(404).send("Page not found")
})
 app.listen(port,()=>{
    console.log("server is running on port 5000");
 })