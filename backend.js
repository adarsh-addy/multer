const express=require('express');
const multer=require('multer')
const mnRouter=express.Router();
const mysql=require('mysql')

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"image"
})

 

const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'--'+file.originalname)
    }
 });

 const upload=multer({
    storage:fileStorageEngine
 });

//  app.post("/multiple",upload.array('images',3),(req,res)=>{
//     console.log(req.files);
//     res.send("Multiple file upload success")
//  });

mnRouter.post("/multiple",upload.array('images',3),(req,res)=>{
    console.log(req.files);
    let obj=req.files;
   //  console.log(obj);
   let imgpath=obj[0].path
   // console.log(imgpath);
   db.getConnection(async(err,connection)=>{
      if(err) throw (err)

      const sqlSearch="SELECT * FROM image_db WHERE image=?"
      const search_query=mysql.format(sqlSearch,[imgpath])

      const sqlInsert="INSERT INTO image_db(image) VALUES(?)"
      const insert_query=mysql.format(sqlInsert,[imgpath]);

      await connection.query(search_query,async(err,result)=>{
         if (err) throw (err)
         console.log("---->searching for result");
         console.log(result.length);
         if(result.length!=0){
            connection.release();
            console.log("record already exist");
            res.json({
               message:"record already exist"
            })
         }else{
            await connection.query(insert_query,(err,result)=>{
               if(err) throw (err)
               console.log("data inserted");
               res.json({
                  message:"data inserted",
                  record:result
               })
               connection.release();
            })
         }
      })
   })
 });

 module.exports=mnRouter;