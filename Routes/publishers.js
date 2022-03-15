var express = require('express');
var router = express.Router();
var db = require('../databases');
router.get('/form', function (req, res, next) {
    res.render('publishers');
});
router.get('/form/update', function (req, res, next) {
    res.render('publishers_update');
});
router.get('/form/delete', function (req, res, next) {
    res.render('publishers_delete');
});
router.get('/publishers_list', function (req, res, next) {
    var sql = 'SELECT * FROM publishers';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('publishers_list', { title: 'publishers List', userData: data });
    });
});
router.post('/create', async function (req, res, next) {

    const userDetails = await req.body;
    console.log(req.body);
    var sql = "INSERT INTO publishers SET ?";
    db.query(sql, userDetails, function (err, data) {
        if (err) throw err;
        console.log("User data is inserted successfully ");
    });
    res.redirect('/publishers/form');  // redirect to user form page after inserting the data
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
    var sql = `UPDATE publishers SET ? WHERE pub_publisherID= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.redirect('/publishers/form/update');
});
router.post('/delete', function (req, res, next) {
    var id = req.body.pub_publisherID;
    console.log(req.body);
    var sql = `Delete FROM publishers WHERE pub_publisherID= ?`;
    db.query(sql, id, function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    if (db.query('select exists(select 1 from publishers) AS Output') != 1) {
        db.query('ALTER TABLE publishers AUTO_INCREMENT = 300')
    }
    res.redirect('/publishers/form/delete');
});

module.exports = router;