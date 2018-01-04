const express = require('express'),
    router = express.Router(),
    sql = require("../module/mysql");

router.get('/',(req,res)=>{
    req.session.admin?res.render("admin/index"):res.render("404");
});
router.get('/index',(req,res)=>{
    req.session.admin?res.render("admin/index"):res.render("404");
});
router.get('/user',(req,res)=>{
    sql("select * from user",(err,data)=>{
        if (err){
            res.render("err");
            return;
        }
        if(req.session.admin){
            res.render("admin/user",{data:data});
        }else{
            res.render("404");
        }
    });
});

module.exports = router;