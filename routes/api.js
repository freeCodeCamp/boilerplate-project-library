/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const mongoose =  require('mongoose');
const MONGODB_CONNECTION_STRING = process.env.CONNECTION_STRING;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});
mongoose.connect(MONGODB_CONNECTION_STRING);
const Schema = mongoose.Schema;
const BookSchema = new Schema({
  title: String,
  commentcount: Number,
  comments:Array
})
const Book = mongoose.model('Book', BookSchema);
module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      Book.find(req.body, (err, data) => {
        if(err){
          res.send('no book exists')
        } else {
          res.json(data);
        }
      });
    console.log('/api/books');
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    })

    .post(function (req, res){
      var title = req.body.title;
      let book = new Book({
        title: title,
        commentcount: 0
      });
      book.save((err, data) => {
        if(err){
          res.send('no book exists');
        } else {
          res.json(data);
        }
      })
      //response will contain new book object including atleast _id and title
    })

    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Book.deleteMany({}, (error, data)=>{
        if(error){
          res.send('failed delete all');
        } else {
          res.send('complete delete successful');
        }
      });
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      Book.findById(bookid)
        .or(req.body)
        .exec((err, data) => {
          if(err || !data){
            res.send('no book exists')
          } else {
            res.json(data);
          }
      });
        console.log('/api/books/:id');

      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })

    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      Book.findById(bookid)
        .exec((err, data) => {
          if(err){
            res.send('no book exists')
          } else {
            if(!data.comments){
              data.comments = [];
            }
            data.comments.push(comment);
            data.save((err, savedData)=>{
              if(err){
                res.send('no book exists');
              } else {
                res.json(savedData);
              }
            })
          }
      });
      //json res format same as .get
    })

    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      Book.findOneAndRemove({_id: bookid}, (err, data) => {
        if(err){
          res.send('no book exists')
        } else {
          res.json('delete successful');
        }
      })
    });

};
