var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000");

describe("Getting all users",function(){
  it("should return all users",function(done){
    server
    .get("/users")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      res.error.should.equal(false);
      done();
    });
  });
});

describe("Posting to user",function(){
    it("should give a user back",function(done){
      server
      .post('/users')
      .send({"name":"bob", "password":"bob"})
      .expect("Content-type",/json/)
      .expect(201)
      .end(function(err,res){
        res.status.should.equal(201);
        res.error.should.equal(false);
        res.body.should.deepEqual([{
            //id is assigned by db, have to check what number of id they are on
            "id": 38,
            "name": "bob",
            "password": "bob",
            "events": []
        }]);
        done();
      });
    });
  
  });