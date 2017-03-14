'use strict';

var expect = require('chai').expect;
var supertest = require('supertest');
var api = supertest('http://localhost:3000/api');

describe('get all tasks', () => {
  it('should get all tasks', (done) => {
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
   it('should get one tasks', (done) => {
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
})


