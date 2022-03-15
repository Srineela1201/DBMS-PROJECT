var con = require('../databases');
const excel = require('exceljs');
let exp = () => {
    con.query("SELECT * FROM members", function (err, members, fields) {

        const jsonMembers = JSON.parse(JSON.stringify(members));
        console.log(jsonMembers);
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('members'); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
            { header: 'Id', key: 'mem_memID', width: 10 },
            { header: 'First Name', key: 'mem_firstname', width: 10 },
            { header: 'Last Name', key: 'mem_lastname', width: 10 },
            { header: 'City', key: 'mem_city', width: 15 },
            { header: 'Locality', key: 'mem_locality', width: 15 },
            { header: 'Date', key: 'mem_date', width: 15 }
        ];

        // Add Array Rows
        worksheet.addRows(jsonMembers);

        // Write to File
        workbook.xlsx.writeFile("members.xlsx")
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