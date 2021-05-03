/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
let dotenv = require('dotenv').config()
var expect = require("chai").expect;
let mongodb = require("mongodb");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

// SET-UP MONGOOSE DB CONNECTIONS


module.exports = function (app) {

  mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

  let bookSchema = new Schema({
    title: {type: String, required: true},
    comments: [String]
    
  });
  let Book = mongoose.model("Book", bookSchema)


  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })
    
    .post(function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      if (!title) {
        return res.json('missing title')
      }



    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
