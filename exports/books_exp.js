var con = require('../databases');
const excel = require('exceljs');
let exp = () => {
    con.query("SELECT * FROM books", function (err, books, fields) {

        const jsonbooks = JSON.parse(JSON.stringify(books));
        console.log(jsonbooks);
        let workbook = new excel.Workbook(); //creating workbook
        let worksheet = workbook.addWorksheet('books'); //creating worksheet

        //  WorkSheet Header
        worksheet.columns = [
            { header: 'Id', key: 'bo_bookID', width: 10 },
            { header: 'First Name Author', key: 'bo_firstnameauthor', width: 30 },
            { header: 'Last Name Author', key: 'bo_lastnameauthor', width: 30 },
            { header: 'Title', key: 'bo_title', width: 10 },
            { header: 'Available', key: 'bo_available', width: 10 }
        ];

        // Add Array Rows
        worksheet.addRows(jsonbooks);

        // Write to File
        workbook.xlsx.writeFile("books.xlsx")
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