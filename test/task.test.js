'use strict';

var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000/api');

describe('Tasks', () => {
	let id = 1;
	it('should create task', done => {
    	let task = {id:id, text:"sample", state:0};
    	api.post("/y")
    		.send(task)
    		.expect('Content-Type', /json/)
    		.expect(200)
    		.end((err,res)=>{
    			if(err){
    				expect( res.body.statusCode).to.eql(200);
    				return done(res);
    			}
    			let tasksFromServer = res.body;
        		expect(tasksFromServer).to.eql(task);
        		return done();
    		});
   })
  it('should get all tasks',done=> {
    api.get('/y')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let tasks = res.body;
        let e = expect(Array.isArray(tasks)).to.be.true;
        return done();
      });
  })
   it('should get one tasks', done => {
    api.get('/y/'+id)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          expect(res.status).to.equal(200);
          return done(err);
        }
        let task = res.body;
        expect(Array.isArray(task)).to.be.false;
        return done();
      });
	})
   it('should update task ', done => {
   		let task = {id:id, text:"new text", state:0};
   	    api.patch("/y")
    		.send(task)
    		.expect('Content-Type', /json/)
    		.expect(200)
    		.end((err,res)=>{
    			if(err){
    				return done(res);
    			}
    			let tasksFromServer = res.body;
        		expect(tasksFromServer.text).to.equal("new text");
        		return done();
    		});
	})
   it('should delete task', done => {
   	   	let task = {id:id, text:"new text", state:0};
   	    api.delete("/y/"+id)
    		.expect('Content-Type', /json/)
    		.expect(200)
    		.end((err,res)=>{
    			if(err){
    				return done(res);
    			}
    			let deletedTask = res.body;
        		expect(deletedTask.count).to.equal(1);
        		return done();
    		});
	})
   it("should thorw 404 because unkown service pointing",done=>{
   		api.get("/x")
   			.expect("Content-Type",/json/)
   			.expect(404)
   			.end((err,res)=>{
   				expect(res.status).to.equal(404);
   				return done();
   			});
   })
   it("should throw 422 because wrong data and can't be processable",done=>{
   		let task = {};
    	api.post("/y")
    		.send(task)
    		.expect('Content-Type', /json/)
    		.expect(500)
    		.end((err,res)=>{
   				expect(res.status).to.equal(422);
   				return done();
    		});
   })
})


