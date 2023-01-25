/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

const Book = require("../models/books")
const Comment = require("../models/comments")

module.exports = function (app) {

  app.route('/api/books')
    .get(async (req, res) => {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      try {
        let arrayOfBooks = await Book.find({});
        res.json(arrayOfBooks);
      } catch (e) {
        console.error(e);
        res.redirect("/");
      }
    })
    
    .post( async (req, res) => {
      let title = req.body.title;

      if(!title) {
        return res.send("missing required field title")
      }

      try {
        let newBook = new Book({
          title: title
        }) 
        let saveBook = await newBook.save();
        let retrievedBook = await Book.findById(saveBook._id);
        let commentPage = await new Comment({book: saveBook._id}).save();
        res.json(retrievedBook);
      } catch (e) {
        console.error(e);
        res.redirect("/");
      }
      //response will contain new book object including atleast _id and title
    })
    
    .delete( async (req, res) => {
      //if successful response will be 'complete delete successful'
      const regEx = /.*/
      try {
        let deleteAction = await Book.deleteMany({title: regEx}); 
        res.send("complete delete successful")
      } catch (e) {
        console.error(e);
        res.redirect("/"); 
      }
    });



  app.route('/api/books/:id')
    .get( async (req, res) => {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      try {
        let com = await Comment.findOne({book: bookid});
        let book = await Book.findById(bookid);

        if(!book) {
          return res.send("no book exists")
        }
        
        let commentArray = com.comment.length > 0 ? com.comment : []

        let obj = {
          _id: book._id,
          title: book.title,
          comments: commentArray
        }

        return res.json(obj)

      } catch (e) {
        console.error(e)
        return res.send("no book exists")
      }
    })
    
    .post( async (req, res) => {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      //if we post with an empty comment
      if(!comment) {
        return res.send("missing required field comment")
      }

      try {
        let com = await Comment.findOne({book: bookid});
        let book = await Book.findById(bookid);

        if(!book) {
          return res.send("no book exists")
        }

        com.comment.push(comment);
        let savedcom = await com.save();

        let obj = {
          _id: book._id,
          title: book.title,
          comments: com.comment
        }

        return res.json(obj)
       
      } catch (e) {
        console.error(e);
        res.redirect("/"); 
      }
      
      // try {
      //   //we make sure the bookID is existing
      //   let book = await Book.findById(bookid);

        

      //   let newComment = new Comment({
      //     comment: comment,
      //     book: bookid
      //   }) 

      //   let saveComment = await newComment.save();

      //   let bookComments = 
      // } catch (e) {
      //   console.error(e);
      //   res.redirect("/"); 
      // }

    })
    
    .delete( async (req, res) => {
      let bookid = req.params.id;
      try {
        let deleteResult = await Book.deleteOne({_id: bookid})
        if(deleteResult.deletedCount > 0) {
          return res.send("delete successful")
        }
        else {
          return res.send("no book exists")
        }
      } catch (e) {
        console.error(e);
        res.redirect("/");
      }
      //if successful response will be 'delete successful'
    });
  
};
