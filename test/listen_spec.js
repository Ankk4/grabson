var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:8080");

describe("Routing", function() {
	//Happy path
	describe("a valid webserver", function() {

		before(function() {
		});

		it("port is binded", function(){
			//is it
		});
		// Index
		it("returns home page", function(done){
			//does it
			done();
 		});
		// 404
 		it("should return 404", function(done){
		    server
			    .get("/random")
			    .expect(404)
			    .end(function(err,res){
			    	res.status.should.equal(404);
			      	done();
		    	});
	  	});
 		// Get
		it('responds with json', function(done) {
		    server
		      	.get('/user')
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