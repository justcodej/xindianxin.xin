const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    crypto = require("crypto");

router.get("/",(req,res)=>{
    res.render("reg");
});
router.post("/",(req,res)=>{
    const user = req.body.uid,
        pass = req.body.psw1,
        md5 = crypto.createHash('md5'),
        newPass = md5.update(pass).digest('hex');
    sql('select * from user where username = ?',[user],(err,data)=> {
        if (err) {
            res.render('err');
            return;
        };
        if (data.length == 0) {
            sql('insert into user (id,username,pass,admin) values (0,?,?,0)',[user,newPass],(err,data)=>{
                if (err){
                    res.render("err");
                    return;
                }else{
                    res.render("result",{user:user})
                }
            });
        }
    });
});
router.post("/info",(req,res)=>{
    const user = req.body.user;
    sql("select * from user where username = ?",[user],(err,data)=>{
        if(err){
            res.render("err");
            return;
        };
        res.json({
            data:data
        })
    })
});
module.exports = router;