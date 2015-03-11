'use strict';

var expect = require('expect');

var Irken = require('irken');

var holovisor = require('../');

describe('holovisor', function(){

  var app;

  beforeEach(function(done){
    app = new Irken();
    done();
  });

  it('renders layout', function(done){
    app.register(holovisor, function(err){
      expect(err).toNotExist();
      done();
    });
  });
});
