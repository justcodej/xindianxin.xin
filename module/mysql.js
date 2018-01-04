const mysql = require("mysql");

module.exports = function (code, value, callback) {
    let config = mysql.createConnection({
        host: "localhost",
        user: "www_xindianxin_",
        password: "XDmYbcTSzW",
        port: "3306",
        database: "www_xindianxin_"
    })
    config.connect();
    config.query(code,value,(err,data)=> {
        callback && callback(err,data);
    });
    config.end();
}
