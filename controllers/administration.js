var express = require('express');
var router = express.Router();
var config = require('../config');
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

router.get('/customers', function( req, res ) {
    mongoClient.connect(config.mongourl, function( err, db ) {
        if( err ) { 
            console.log( err );
        }

        var customers = db.collection('customers');
        customers.find({}).toArray(function( err, records ) {
            if( err ) {
                console.log( err );
            }

            res.render("customers", { 'category': 'customers','customers': records });
        });
    });
});

router.get('/customers/add', function( req, res ) {
    res.render('customer_add', { 'category':'customers'});
});

router.post('/customers/add', function( req, res ) {
    mongoClient.connect(config.mongourl, function( err, db ) {
        if( err ) {
            console.log( err );
        }

        var customers = db.collection('customers');
        customers.insert( 
            { 
                'name': req.body.customer_name,
                'address': req.body.customer_address,
                'city': req.body.customer_city,
                'state': req.body.customer_state,
                'zip': req.body.customer_zip,
                'phone': req.body.customer_phone,
                'email': req.body.customer_email
            }, function( err, result ) {
                res.redirect('/administration/customers');
        });
    });
});

router.get('/customers/:id', function( req, res ) {
    mongoClient.connect( config.mongourl, function( err, db ) {
        if( err ) {
            console.log( err );
        }

        var customers = db.collection('customers');
        customers.find({'_id': new ObjectID(req.params.id)}).toArray(function( err, records) {
            if( err ) {
                console.log( err );
            }

            console.log( records );
            res.render('customer', { 'category': 'customers', 'customer': records[0]});
        });
    });
});

module.exports = router;
