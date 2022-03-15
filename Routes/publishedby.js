var express = require('express');
var router = express.Router();
var db = require('../databases');
var exports = require('../exports/books_exp')
router.get('/form', function (req, res, next) {
    res.render('publishedby');
});
router.get('/form/update', function (req, res, next) {
    res.render('publishedby_update');
});
router.get('/form/delete', function (req, res, next) {
    res.render('publishedby_delete');
});
router.get('/publishedby_list', function (req, res, next) {
    var sql = 'SELECT * FROM publishedby';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('publishedby_list', { title: 'publishedby List', userData: data });
    });
});
router.post('/create', async function (req, res, next) {

    const userDetails = await req.body;
    console.log(req.body);
    var sql = "INSERT INTO publishedby SET ?";
    db.query(sql, userDetails, function (err, data) {
        if (err) throw err;
        console.log("User data is inserted successfully ");
    });
    res.redirect('/publishedby/form');  // redirect to user form page after inserting the data
});
router.post('/edit', function (req, res, next) {
    var id = req.body.pub_publisherID;
    var updateData = req.body;

    Object.keys(updateData).forEach(key => {
        if (updateData[key] === '') {
            delete updateData[key];
        }
    });
    console.log(req.body);
    var sql = `UPDATE publishedby SET ? WHERE pub_publisherID= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.redirect('/publishedby/form/update');
});
router.post('/delete', function (req, res, next) {
    var id = req.body.pub_publisherID;
    console.log(req.body);
    var sql = `Delete FROM publishedby WHERE pub_publisherID= ?`;
    db.query(sql, id, function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    if (db.query('select exists(select 1 from publishedby) AS Output') != 1) {
        db.query('ALTER TABLE publishedby AUTO_INCREMENT = 300')
    }
    res.redirect('/publishedby/form/delete');
});
router.post('/exports', function (req, res, next) {
    exports();
    res.redirect('/books/')
});
module.exports = router;