//Create web server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { stringify } = require('querystring');
const { parse } = require('path');
const { json } = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/html')));
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(express.static(path.join(__dirname, 'public/js')));
app.use(express.static(path.join(__dirname, 'public/img')));
app.use(express.static(path.join(__dirname, 'public/json')));

//Read JSON file
var comments = fs.readFileSync("public/json/comments.json");
comments = JSON.parse(comments);

//Create a route to get all comments
app.get('/api/comments', function (req, res) {
    res.send(comments);
});

//Create a route to post a comment
app.post('/api/comments', function (req, res) {
    var comment = {
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(comment);
    fs.writeFileSync("public/json/comments.json", JSON.stringify(comments));
    res.send(comments);
});

//Create a route to delete a comment
app.delete('/api/comments/:index', function (req, res) {
    comments.splice(req.params.index, 1);
    fs.writeFileSync("public/json/comments.json", JSON.stringify(comments));
    res.send(comments);
});

//Create a route to update a comment
app.put('/api/comments/:index', function (req, res) {
    comments[req.params.index] = {
        name: req.body.name,
        comment: req.body.comment
    };
    fs.writeFileSync("public/json/comments.json", JSON.stringify(comments));
    res.send(comments);
});

//Create a route to get a comment
app.get('/api/comments/:index', function (req, res) {
    res.send(comments[req.params.index]);
});

//Create a route to get a comment
app.get('/api/comments/:index/:field', function (req, res) {
    res.send(comments[req.params.index][req.params.field]);
});

//Create a route to get a comment
app.get('/api/comments/:index/:field/:subfield', function (req, res) {
    res.send(comments[req.params.index][req.params.field][req.params.subfield]);
});

//Create a route to get a comment
app.get('/api/comments/:index/:field/:subfield/:subsubfield', function (req, res) {
    res.send(comments[req.params.index][req.params.field][req.params.subfield][req.params.subsubfield]);
});

//Create a route to get a comment
app.get('/api/comments/:index/:field/:subfield/:subsubfield/:subsubsubfield', function (req, res) {
    res.send(comments[req.params.index][req.params.field][req.params.subfield][req.params.subsubfield][req.params.subsubsubfield]);
});
