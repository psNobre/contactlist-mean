'use strict';

var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('contactlist',['contatos']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//GETs
app.get('/contatos', function (req, res) {
	console.log('GET Request recebido.');
    db.contatos.find(function (err, docs) {
        console.log(docs);
        res.json(docs);
        console.log("GET Response respondido.");
    });
});


app.get("/contatos/:id", function (req, res) {
    console.log('GET Request recebido.');
    var id = req.params.id;
    db.contatos.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        console.log(doc);
        res.json(doc);
        console.log("GET Response respondido.");
    });
});

//POSTs
app.post('/contatos', function (req, res) {
    console.log('POST Request recebido.');
    console.log(req.body);
    db.contatos.insert(req.body, function (err, doc) {
        res.json(doc);
        console.log("POST Response respondido.");
    })
});

//DELETEs
app.delete('/contatos/:id', function (req, res) {
    var id = req.params.id;
    console.log("DELETE Request recebido: objectId - "+id);
    db.contatos.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
        res.json(doc);
        console.log("DELETE Response enviado.");
    });

});

//PUTs
app.put('/contatos/:id', function (req, res) {
     var id = req.params.id;
     console.log("PUT Request recebido.");
     db.contatos.findAndModify({query: {_id: mongojs.ObjectId(id)},
     update: {$set: {nome: req.body.nome, telefone: req.body.telefone, data: new Date()}}, new: true}, function (err, doc) {
         res.json(doc);
         console.log("PUT Response enviado.");
        });

});


app.listen(3000);
console.log("Server Rodando: porta 3000");