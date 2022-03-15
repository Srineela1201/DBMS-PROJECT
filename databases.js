var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Deepak@2001",
    port: 3306, // default port for mysql is 3306
    database: "library", // database from which we want to connect out node application
});
// con.connect(function (err) {
//     if (err) throw err;
//     con.query("SELECT * FROM student", function (err, result, fields) {
//         if (err) throw err;
//         console.log(result);
//     });
// });
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
module.exports = con;

