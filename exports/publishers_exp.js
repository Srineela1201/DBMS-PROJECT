var con = require('../databases');
const excel = require('exceljs');
let exp = () => {
    con.query("SELECT * FROM publishers", function (err, publishers, fields) {

        const jsonpublishers = JSON.parse(JSON.stringify(publishers));
        console.log(jsonpublishers);
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('publishers'); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
            { header: 'Id', key: 'pub_publisherID', width: 10 },
            { header: 'Compamy name', key: 'pub_name', width: 20 },
            { header: 'City', key: 'pub_city', width: 30 },
            { header: 'Locality', key: 'pub_locality', width: 20 },
        ];

        // Add Array Rows
        worksheet.addRows(jsonpublishers);

        // Write to File
        workbook.xlsx.writeFile("publishers.xlsx")
            .then(function () {
                console.log("file saved!");
            });

        // -> Close MySQL connection
        // con.end(function (err) {
        //     if (err) {
        //         return console.log('error:' + err.message);
        //     }
        //     console.log('Close the database connection.');
        // });
    });
}
module.exports = exp;