var express = require('express');
var router = express.Router();
var db = require('../databases');
router.get('/form', function (req, res, next) {
    console.log("m here")
    res.render('books');
});
router.get('/form/update', function (req, res, next) {
    res.render('books_update');
});
router.get('/form/delete', function (req, res, next) {
    res.render('books_delete');
});
router.get('/books_list', function (req, res, next) {
    var sql = 'SELECT * FROM books';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('books_list', { title: 'books List', userData: data });
    });
});
router.post('/create', async function (req, res, next) {

    const userDetails = await req.body;
    console.log(req.body);
    var sql = "INSERT INTO books SET ?";
    db.query(sql, userDetails, function (err, data) {
        if (err) throw err;
        console.log("User data is inserted successfully ");
    });
    res.redirect('/books/form');  // redirect to user form page after inserting the data
});
router.post('/edit', function (req, res, next) {
    var id = req.body.bo_bookID;
    var updateData = req.body;

    Object.keys(updateData).forEach(key => {
        if (updateData[key] === '') {
            delete updateData[key];
        }
    });
    console.log(req.body);
    var sql = `UPDATE books SET ? WHERE bo_bookID= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.redirect('/books/form/update');
});
router.post('/delete', function (req, res, next) {
    var id = req.body.bo_bookID;
    console.log(req.body);
    var sql = `Delete FROM books WHERE bo_bookID= ?`;
    db.query(sql, id, function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    if (db.query('select exists(select 1 from books) AS Output') != 1) {
        db.query('ALTER TABLE books AUTO_INCREMENT = 1')
    }
    res.redirect('/books/form/delete');
});

module.exports = router;