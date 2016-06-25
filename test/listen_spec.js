var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

describe("Routing", function() {
	//Happy path
	describe("A Valid API", function() {
		before(function() {});

		it("Port is binded", function(){
		});
		it("Returns home page", function(done){
			server
			    .get("/")
			    .expect(200)
			    .end(function(err,res){
			    	res.status.should.equal(200);
			      	done();
		    	});
			done();
 		});
		// 404
 		it("Returns 404", function(done){
		    server
			    .get("/random")
			    .expect(404)
			    .end(function(err,res){
			    	res.status.should.equal(404);
			      	done();
		    	});
	  	});
		it('Returns users', function(done) {
		    server
		      	.get('/users')
		      	.set('Accept', 'application/json')
		      	.expect('Content-Type', /json/)
		    	.expect(200, done);
	  	});

		it("listens to post url");
		it("creates log entries");
		it("sends data succesfully");
		it("reads data succesfully");
		it("writes data succesfully");
	});

	describe("Invalid data recieved", function() {
		it("is not succesfull");
		it("reports user of failure");
	});
});