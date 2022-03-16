// Importing mysql and csvtojson packages
// Requiring module
const csvtojson = require('csvtojson');
const mysql = require("mysql");
var con = require('../databases');

// CSV file name
const fileName = "publishers.csv";
let imp = () => {
    csvtojson().fromFile(fileName).then(source => {

        // Fetching the data from each row
        // and inserting to the table "sample"
        for (var i = 0; i < source.length; i++) {
            var Company_Name = source[i]["Name"],
                City = source[i]["City"],
                Locality = source[i]["Locality"]

            var insertStatement =
                `INSERT INTO publishers (pub_name,pub_city, pub_locality) values(?, ?, ?)`;
            var items = [Company_Name, City, Locality];

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