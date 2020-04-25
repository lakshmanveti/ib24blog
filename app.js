const WPAPI = require( 'wpapi');
const http = require('http');
const cors = require("cors");
const express = require('express');
const app = express();
app.use(cors());
var port = process.env.port || 8080;


// var wp = new WPAPI({
//     endpoint: 'https://wishkarmahome.wpcomstaging.com/wp-json',
//     username: 'wishkarma1',
//     password: 'blog@wishkarma'
// });


var wp = new WPAPI({
    endpoint: 'http://ib24admin.ironbutterfly24.com/?rest_route=/',
    username: 'ironbutterfly24',
    password: 'W*(5NOtYQ*hgpO&jiL'
});




app.get('/', function (req, res) {
    res.send('<h1>Blog API</h1>');
});


app.get('/media/:id', function (req, res) {
    //console.log(req.params)
    if(!req.params.id) res.send('{}');
    wp.media().id(req.params.id).then(function( response ) {
        res.send(JSON.stringify(response));
    }).catch(function(err){
        res.send(JSON.stringify(err));
    });
});


app.get('/posts/:perPage/:page/:cat', function (req, res) {
    var perPage = req.params.perPage?req.params.perPage:10;
    var page = req.params.page?req.params.page:1;
    var cat = req.params.cat != '-1'?req.params.cat:"";
    wp.posts().categories(cat).perPage(perPage).page(page).embed().then(function( response ) {
        res.send(JSON.stringify(response));
    }).catch(function(err){
        res.send(JSON.stringify(err));
    });
});

app.get('/post/:id', function (req, res) {
    //console.log(req.params)
    if(!req.params.id) res.send('{}');
    wp.posts().id(req.params.id).embed().then(function( response ) {
        res.send(JSON.stringify(response));
    }).catch(function(err){
        res.send(JSON.stringify(err));
    });
});


var server = app.listen(port, function () {
    console.log('Node server is running.. on '+port);
});