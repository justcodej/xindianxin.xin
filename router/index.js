const express = require('express'),
    router = express.Router(),
    sql = require("../module/mysql");

router.get('/',(req,res)=>{
    res.locals.admin = req.session.admin;
    sql("select * from article order by id limit 0,5",(err,data)=>{
        res.render("index",{data:data});
    });
});

router.post('/',(req,res)=>{
    const num = Number(req.body.num);
    sql("select * from article order by id limit ?,5",[num],(err,data)=>{
        if(err){
            res.render("err");
            return;
        }
        res.json({
            data:data
        });
    })
});
router.get("/detail/:id.html",(req,res)=>{
    sql("select * from article where id = ?",[req.params.id],(err,data)=>{
        if (data.length == 0){
            res.render("404");
            return;
        }
        sql("select * from comments where pid = ?",[req.params.id],(err,data1)=>{

            res.render("detail",{data:data,comments:data1});
        })
    })
});
router.post("/detail/:id.html",(req,res)=>{
    const pid = req.params.id,
        content = req.body.comment,
        time = new Date().toLocaleString().substring(0,10);
    sql("insert into comments (id,uid,pid,content,time) values (0,0,?,?,?)",[pid,content,time],(err,data)=>{
        if (err){
            res.render("err");
            return;
        }
        res.send("成功")
    })
});
router.use('/admin',require("./admin"));
router.use("/reg",require("./reg"));
router.use("/login",require("./login"));
router.use('/logout',(req,res)=>{
    res.clearCookie('login');
    req.session.admin = 0;
    res.redirect('/');
})
module.exports = router;