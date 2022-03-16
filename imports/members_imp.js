// Importing mysql and csvtojson packages
// Requiring module
const csvtojson = require('csvtojson');
const mysql = require("mysql");
var con = require('../databases');

// CSV file name
const fileName = "members.csv";
let imp = () => {
    csvtojson().fromFile(fileName).then(source => {

        // Fetching the data from each row
        // and inserting to the table "sample"
        for (var i = 0; i < source.length; i++) {
            var First_Name = source[i]["First_Name"],
                Last_Name = source[i]["Last_Name"],
                City = source[i]["City"],
                Locality = source[i]["Locality"],
                Dates = source[i]["Dates"]

            var insertStatement =
                `INSERT INTO members (mem_firstname,mem_lastname,mem_city,mem_locality,mem_date) values(?, ?, ?, ?,?)`;
            var items = [First_Name, Last_Name, City, Locality, Dates];

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