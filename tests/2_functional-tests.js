/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */

  // TEST #1 -
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
  // TEST #1 -
      test('Test POST /api/books with title', function(done) {
        chai
        .request(server)
        .post()
        .send()
        .end()
        

        done();
      });
      
  // TEST #2 -    
      test('Test POST /api/books with no title given', function(done) {
        //done();
        chai.request(server)
        .post('/api/books')
        .send({})
        .end(function(err, res){
          assert.equal(res.body, 'missing title')
        done();
        });
      });
      
    });


    suite('GET /api/books => array of books', function(){
  // TEST #3 -    
      test('Test GET /api/books',  function(done){
        //done();
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
  // TEST #4 -   
      test('Test GET /api/books/[id] with id not in db',  function(done){
        //done();
      });
  // TEST #5 -    
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        //done();
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
  // TEST #6 -    
      test('Test POST /api/books/[id] with comment', function(done){
        //done();
      });
  // TEST #7 -
      test('Test POST /api/books/[id] without comment field', function(done){
        //done();
      });
  // TEST #8 -
      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        //done();
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {
  // TEST #9 -
      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        //done();
      });
  // TEST #10 -
      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        //done();
      });

    });

  });

});
