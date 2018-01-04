const express = require('express'),
    router = express.Router(),
    sql = require("../module/mysql"),
    crypto = require("crypto");

router.get('/',(req,res)=>{
    res.render('login');
});
router.post('/',(req,res)=>{
    const user = req.body.user,
        pass = req.body.pass,
        md5 = crypto.createHash("md5"),
        newPass = md5.update(pass).digest('hex');
    sql('select * from user where username = ?',[user],(err,data)=>{
        if (err){
            res.render("err");
            return;
        }
        if( data.length == 0 ){
            res.json({
                data:"用户名不存在"
            })
        }else if( data[0].pass == newPass ){
            res.cookie('login',{user:user},{maxAge: 1000*60*60*24});
            req.session.admin = Number(data[0].admin);
            res.json({
                data:data
            })
        }else{
            res.json({
                data:"密码错误"
            })
        }
    });
});

module.exports = router;