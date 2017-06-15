/**
 * Created by Justin on 15-6-2017.
 */
var express = require('express');
var routes = express.Router();
var db = require('../config/db');

//
// Geeft een lijst van alle films.
//
// offset en count nog toevoegen aan deze
routes.get('/films', function (req, res) {
    res.contentType('application/json');

    db.query('SELECT * FROM film', function (error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Geeft een specifieke film.
//
routes.get('/films/:filmid', function(req, res) {

    var filmsId = req.params.id;

    res.contentType('application/json');

    db.query('SELECT * FROM film WHERE film_id=?', [filmsId], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Geeft een specifieke rental.
//
routes.get('/rentals/:userid', function(req, res) {

    var rentalId = req.params.id;

    res.contentType('application/json');

    db.query('SELECT * FROM rental WHERE rental_id=?', [rentalId], function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Maakt een nieuwe uitlening voor de gegeven
// gebruiker van het exemplaar met
// gegeven inventoryid.
//
routes.post('/rentals/:userid/:inventoryid', function(req, res) {

    var rentals = req.body;
    var query = {
        sql: 'INSERT INTO `rental`(`rental_id`, `customer_id`) VALUES (?, ?)',
        values: [rentals.rental_id, rentals.customer_id],
        timeout: 2000 // 2secs
    };

    console.dir(rentals);
    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Wijzig bestaande uitlening voor de gegeven
// gebruiker van het exemplaar met
// gegeven inventoryid.
//
routes.put('/rentals/:userid/:inventoryid ', function(req, res) {

    var rentals = req.body;
    var userid = req.params.id;
    var inventoryid = req.params.id;
    var query = {
        sql: 'UPDATE `rental` SET userid=? WHERE userid=? AND inventoryid=?',
        values: [rentals.userid, userid, inventoryid],
        timeout: 2000 // 2secs
    };

    console.dir(rentals);
    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

//
// Verwijder bestaande uitlening voor de
// gegeven gebruiker van het exemplaar
// met gegeven inventoryid.
//
routes.delete('/rentals/:userid/:inventoryid', function(req, res) {

    var userid = req.params.id;
    var inventoryid = req.params.id;
    var query = {
        sql: 'DELETE FROM `rental` WHERE userid=? AND inventoryid=?',
        values: [userid, inventoryid],
        timeout: 2000 // 2secs
    };

    console.log('Onze query: ' + query.sql);

    res.contentType('application/json');
    db.query(query, function(error, rows, fields) {
        if (error) {
            res.status(401).json(error);
        } else {
            res.status(200).json({ result: rows });
        };
    });
});

module.exports = routes;
