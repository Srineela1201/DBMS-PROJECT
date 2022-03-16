// Importing mysql and csvtojson packages
// Requiring module
const csvtojson = require('csvtojson');
const mysql = require("mysql");
var con = require('../databases');

// CSV file name
const fileName = "books.csv";
let imp = () => {
    csvtojson().fromFile(fileName).then(source => {

        // Fetching the data from each row
        // and inserting to the table "sample"
        for (var i = 0; i < source.length; i++) {
            var First_Name = source[i]["First_Name"],
                Last_Name = source[i]["Last_Name"],
                Title = source[i]["Title"],
                Availablity = source[i]["Availablity"]

            var insertStatement =
                `INSERT INTO books (bo_firstnameauthor,bo_lastnameauthor,bo_title,bo_available) values(?, ?, ?, ?)`;
            var items = [First_Name, Last_Name, Title, Availablity];

            // Inserting data of current row
            // into database
            con.query(insertStatement, items,
                (err, results, fields) => {
                    if (err) {
                        console.log(
                            "Unable to insert item at row ", i + 1);
                        return console.log(err);
                    }
                });
        }
        console.log("All items stored into database successfully");
    });
}
module.exports = imp;