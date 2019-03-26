const chai = require('chai'),
    test = process.env.NODE_ENV
    mongoose = require('mongoose'),
    should = chai.should(),
    chaihttp = require('chai-http'),
    app = require('../app')

module.exports = {
    chai, chaihttp, should, app, mongoose,
    clearDB(done) {
        mongoose.connect(`mongodb://localhost:27017/${test}`, { useNewUrlParser: true }, function () {
            mongoose.connection.db.dropDatabase();
            done();
        })
    }
}