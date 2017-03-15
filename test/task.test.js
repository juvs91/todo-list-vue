'use strict';

var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000/api');

describe('get all tasks', () => {
	let id = 113;
  it('should get all tasks', () => {
    api.get('/y')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let tasks = res.body;
        let e = expect(tasks.length).to.be.above(1);
        done();
      });
  })
   it('should get one tasks', () => {
    api.get('/y/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        let task = res.body;
        let e = expect(Array.isArray(task)).to.be.false;
        done();
      });
	})
    it('should create task', () => {
    	let task = {id:id, text:"sample", state:0};
    	api.post("/y")
    		.send(task)
    		.expect('Content-Type', /json/)
    		.expect(200)
    		.end((err,res)=>{
    			if(err){
    				return done(res);
    			}
    			let tasksFromServer = res.body;
        		expect(tasksFromServer).to.eql(task);
        		done();
    		});
	})
   it('should update task ', () => {
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
        		done();
    		});
	})
   it('should delete task', () => {
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
        		done();
    		});
	})
})


