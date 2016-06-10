var Data = require('../models/data');
var should = require('should');

describe("Data", function() {

	describe("defaults", function() {
		var data = {};

		before(function(){
			data = new Data({game: "highlyResponsive"});
		});

		it("game is highlyResponsive", function(){
			data.game.should.equal("highlyResponsive");
		});

		it("has a created date", function(){
			data.createdAt.should.be.defined;
		});

		it("has a identity token", function(){
			data.idToken.should.be.defined;
		});

		it("has a database record");
		it("has at least one meaningful value");

	});

});

