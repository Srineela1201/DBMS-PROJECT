var express = require('express');
var router = express.Router();
var db = require('../databases');
router.get('/form', function (req, res, next) {
    res.render('members');
});
router.get('/form/update', function (req, res, next) {
    res.render('members_update');
});
router.get('/form/delete', function (req, res, next) {
    res.render('members_delete');
});
router.get('/members_list', function (req, res, next) {
    var sql = 'SELECT * FROM members';
    db.query(sql, function (err, data, fields) {
        if (err) throw err;
        res.render('members_list', { title: 'members List', userData: data });
    });
});
router.post('/create', async function (req, res, next) {

    const userDetails = await req.body;
    console.log(req.body);
    var sql = "INSERT INTO members SET ?";
    db.query(sql, userDetails, function (err, data) {
        if (err) throw err;
        console.log("User data is inserted successfully ");
    });
    res.redirect('/members/form');  // redirect to user form page after inserting the data
});
router.post('/edit', function (req, res, next) {
    var id = req.body.mem_memID;
    var updateData = req.body;

    Object.keys(updateData).forEach(key => {
        if (updateData[key] === '') {
            delete updateData[key];
        }
    });
    console.log(req.body);
    var sql = `UPDATE members SET ? WHERE mem_memID= ?`;
    db.query(sql, [updateData, id], function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.redirect('/members/form/update');
});
router.post('/delete', function (req, res, next) {
    var id = req.body.mem_memID;
    console.log(req.body);
    var sql = `Delete FROM members WHERE mem_memID= ?`;
    db.query(sql, id, function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    if (db.query('select exists(select 1 from members) AS Output') != 1) {
        db.query('ALTER TABLE members AUTO_INCREMENT = 1')
    }
    res.redirect('/members/form/delete');
});

module.exports = router;