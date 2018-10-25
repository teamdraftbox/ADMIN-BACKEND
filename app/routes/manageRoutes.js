var express = require("express")
var bodyParser = require("body-parser")
var app = express.Router({mergeParams:true})
var Manage = require("../model/manage.js")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,accept-encoding,x-access-token, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });


//campsite route///////////////////////////////////
app.get("/manage/management",function(req,res){
    Manage.find({},function(err,manage){
        if(err){
            res.json({success:false,message:"unable to find data"})
        }else{
            res.json({success:true,message:"Succesfully obatined data", data:manage})
        }
    })
})
    
    
app.get("/manage/management/:id",function(req,res){
    Manage.findById(req.params.id,function(err,data){
        if(err){res.json({success:false,message:"unable to find data"})}else{
        res.json({success:true,message:"Succesfully obatined data", data:data})
        }
    })
})
//post the data to database///////////////////
app.post("/manage/management",function(req,res){
    console.log(req.body.companyName)
    var obj = {
    companyName:req.body.companyName,
    subDomain:req.body.subDomain,
    companyImage1:req.body.companyImage1,
    companyImage2:req.body.companyImage2,
    bannerText:req.body.bannerText,
    email:req.body.email,
    detail:req.body.detail
    }
    //console.log(obj)
Manage.create(obj,function(err,management){
  if(err){
      res.json({success:false,message:"unable to find data"})
  }else{
       res.json({success:true,message:"Succesfully added data", data:management})
  }
})
 })

//edit and update the campsite///////////////////

app.put("/manage/management/:id",function(req,res){
   var obj = {
    companyName:req.body.companyName,
    subDomain:req.body.subDomain,
    companyImage1:req.body.companyImage1,
    companyImage2:req.body.companyImage2,
    bannerText:req.body.bannerText,
    email:req.body.email,
    detail:req.body.detail,
    id:req.body.id
    }
    Manage.findByIdAndUpdate(obj.id,obj,function(err,managment){
        if(err){
             res.json({success:false,message:"unable to find data"})
        }else{
            res.json({success:true,message:"Succesfully obatined data", data:managment})
        }
    })

})
//delete the route/////////////////////////////////////
app.delete("/manage/management/:id",function(req,res){
    Manage.findByIdAndRemove(req.params.id,function(err,body){
        if(err){res.json({success:false,message:"unable to delete data"})}else{
            res.json({success:true,message:"successfully deleted data"})
        }
    })
})


module.exports = app