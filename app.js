const http = require('http'),
    express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    session = require("express-session");

module.exports = app;
app.set('views',__dirname+"/views");
app.set('view engine','ejs');
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('wu'));
app.use(session({
    resave: false, //添加 resave 选项
    saveUninitialized: true, //添加 saveUninitialized 选项
    secret: 'aF,.j)wBhq+E9n#aHHZ91Ba!VaoMfC', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 60 * 1000 }
}));
require("./module/configdata");

app.use('/',require(__dirname+"/router/index"));
http.createServer(app).listen(3000);