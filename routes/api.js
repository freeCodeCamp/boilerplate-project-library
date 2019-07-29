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
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        db.collection('books')
          .find({})
          .toArray((err, docs) => {
            //json res format: [{"_id": bookid, "title": book_title,
            //"commentcount": num_of_comments },...]
            let result;
            result = docs.map((ele, i, arr) => { //forEach iteration 
              let obj = {};
              obj._id = arr[i]._id;
              obj.title = arr[i].title;
              obj.commentcount = !arr[i].comments ? 0 : arr[i].comments.length;
              return obj;
            });
            res.json(result) //response will be array of book objects
          });
      });
    
    })
    
    .post(function (req, res){
      var title = req.body.title;
      var book = { title };
    
      if(!title) { res.send('no title given') }
      else {
        MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
          db.collection('books').insertOne(book, (err, doc) => {
            res.json(book); //response will contain new book object including atleast _id and title
          });
        });
      } 
      
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        db.collection('books').deleteMany({}, (err, doc) => {
          (err) ? res.send('complete delete unsuccessful') : res.send('complete delete successful');
        });
      });
    });

//json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        db.collection('books').find({_id: ObjectId(bookid)}).toArray((err, doc) => {
          expect(err, 'error').to.not.exist;
          doc.length === 0 ? res.send('book does not exists') : res.json(doc[0])
        });
      });
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      var update = { comments: [] };
      
      if(!bookid) { res.send('no id given')}
      if(!comment) { res.send('no comment given') }
      
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        db.collection('books')
          .findAndModify({_id: ObjectId(bookid)}, 
                         {},
                         {$push: { comments: comment } },
                         {new: true},
                         (err, doc) => {                   //json res format same as .get
            (err) ? res.send('adding comment unsuccessful') : res.json(doc.value);
          });
      });
      
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
      MongoClient.connect(MONGODB_CONNECTION_STRING, (err, db) => {
        db.collection('books').remove({_id: ObjectId(bookid)}, (err, doc) => {
          (err) ? res.send('delete unsuccessful') : res.send('delete successful');
        });
      });
    });
  
};
