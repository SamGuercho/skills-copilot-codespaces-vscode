//Create Web Server
//http://localhost:3000/comments
//http://localhost:3000/comments?postId=1
//http://localhost:3000/comments?postId=1&userId=1
//http://localhost:3000/comments?postId=1&userId=1&_sort=id&_order=desc
//http://localhost:3000/comments?postId=1&userId=1&_sort=id&_order=desc&_limit=1

//import express
const express = require('express');
//create express app
const app = express();
//import json data
const comments = require('./data/comments');
//import json data
const posts = require('./data/posts');
//import json data
const users = require('./data/users');
//import cors
const cors = require('cors');
//import body-parser
const bodyParser = require('body-parser');
//import lodash
const _ = require('lodash');

//use cors
app.use(cors());
//use body-parser
app.use(bodyParser.json());

//get all comments
app.get('/comments', (req, res) => {
    //get postId
    const postId = req.query.postId;
    //get userId
    const userId = req.query.userId;
    //get sort
    const sort = req.query._sort;
    //get order
    const order = req.query._order;
    //get limit
    const limit = parseInt(req.query._limit);
    //get comments
    let commentsList = comments;
    //get posts
    let postsList = posts;
    //get users
    let usersList = users;
    //check postId
    if (postId) {
        //filter comments by postId
        commentsList = commentsList.filter(comment => comment.postId == postId);
    }
    //check userId
    if (userId) {
        //filter comments by userId
        commentsList = commentsList.filter(comment => comment.userId == userId);
    }
    //check sort
    if (sort) {
        //check order
        if (order == 'desc') {
            //sort comments by id descending
            commentsList = _.orderBy(commentsList, [sort], ['desc']);
        } else {
            //sort comments by id ascending
            commentsList = _.orderBy(commentsList, [sort], ['asc']);
        }
    }
  });
