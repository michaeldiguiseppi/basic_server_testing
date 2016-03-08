var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);

describe('API routes', function() {

    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run().then(function() {
                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        });
    });

    describe('Get all shows', function() {
        it('should get all shows', function(done) {
            chai.request(server)
            .get('/api/shows')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(4);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Suits');
                res.body[0].should.have.property('channel');
                res.body[0].channel.should.equal('USA Network');
                res.body[0].should.have.property('genre');
                res.body[0].genre.should.equal('Drama');
                res.body[0].should.have.property('rating');
                res.body[0].rating.should.equal(3);
                res.body[0].should.have.property('explicit');
                res.body[0].explicit.should.equal(false);
                done();
            });
        });
    });

    describe('Get one show', function() {
        it('should get one show', function(done) {
            chai.request(server)
            .get('/api/show/1')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Suits');
                res.body[0].should.have.property('channel');
                res.body[0].channel.should.equal('USA Network');
                res.body[0].should.have.property('genre');
                res.body[0].genre.should.equal('Drama');
                res.body[0].should.have.property('rating');
                res.body[0].rating.should.equal(3);
                res.body[0].should.have.property('explicit');
                res.body[0].explicit.should.equal(false);
                done();
            });
        });
    });


    describe('Add a single show', function() {
      it('should add a single show', function(done) {
        chai.request(server)
        .post('/api/shows')
        .send({
          name: 'Scrubs',
          channel: 'ABC',
          genre: 'Comedy',
          rating: 5,
          explicit: false
        })
        .end(function(err, res) {
          chai.request(server)
            .get('/api/show/'+res.body)
            .end(function(err, res) {
              res.should.have.status(200);
              res.body[0].should.have.property('name');
              res.body[0].name.should.equal('Scrubs');
              res.body[0].should.have.property('channel');
              res.body[0].channel.should.equal('ABC');
              res.body[0].should.have.property('genre');
              res.body[0].genre.should.equal('Comedy');
              res.body[0].should.have.property('rating');
              res.body[0].rating.should.equal(5);
              res.body[0].should.have.property('explicit');
              res.body[0].explicit.should.equal(false);
              done();
            });
        });
      });
    });

    describe('Edit a single show', function() {
      it('should edit a single show', function(done) {
        chai.request(server)
          .get('/api/shows')
          .end(function(err, res) {
            chai.request(server)
            .put('/api/show/1')
            .send({
              name: 'New Suits',
              channel: 'USA Network',
              genre: 'Drama',
              rating: 3,
              explicit: false
            })
            .end(function(err, res) {
              res.should.have.status(200);
              res.body[0].should.have.property('name');
              res.body[0].name.should.equal('New Suits');
              res.body[0].should.have.property('channel');
              res.body[0].channel.should.equal('USA Network');
              res.body[0].should.have.property('genre');
              res.body[0].genre.should.equal('Drama');
              res.body[0].should.have.property('rating');
              res.body[0].rating.should.equal(3);
              res.body[0].should.have.property('explicit');
              res.body[0].explicit.should.equal(false);
              done();
            });
          });
      });
    });

    describe('delete a show', function() {
      it('should delete a show', function(done) {
        chai.request(server)
          .delete('/api/show/2')
          .end(function(err, res) {
            chai.request(server)
            .get('/api/shows')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.equal(3);
                res.body[0].should.have.property('name');
                res.body[0].name.should.equal('Suits');
                res.body[0].should.have.property('channel');
                res.body[0].channel.should.equal('USA Network');
                res.body[0].should.have.property('genre');
                res.body[0].genre.should.equal('Drama');
                res.body[0].should.have.property('rating');
                res.body[0].rating.should.equal(3);
                res.body[0].should.have.property('explicit');
                res.body[0].explicit.should.equal(false);
                done();
            });
          });
      });
    });
});
