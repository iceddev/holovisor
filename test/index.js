'use strict';

const expect = require('expect');

const React = require('react/addons');
const TestUtils = React.addons.TestUtils;
const Irken = require('irken');

const holovisor = require('../src');
const Layout = require('../src/layout');

describe('holovisor', function(){

  let app;

  beforeEach(function(done){
    app = new Irken();
    done();
  });

  afterEach(function(done){
    // TODO: remove this when we can override the container through irken options
    document.body.removeChild(app._container);
    done();
  });

  it('binds addMountpoint & removeMountpoint before passing to the component', function(done){
    function testBind(){
      // this failing produces a nasty message
      // basically, it will only happen if functions aren't bound
      expect(this).toEqual(app);
    }

    const addSpy = expect.spyOn(app, 'addMountpoint').andCall(testBind);
    const removeSpy = expect.spyOn(app, 'removeMountpoint').andCall(testBind);

    app.register(holovisor, function(err){
      expect(err).toNotExist();
      app.render(function(renderErr){
        React.unmountComponentAtNode(app._container);
        addSpy.restore();
        removeSpy.restore();
        expect(renderErr).toNotExist();
        expect(addSpy.calls.length).toEqual(3);
        expect(removeSpy.calls.length).toEqual(3);
        done();
      });
    });
  });

  it('renders layout', function(done){
    const spy = expect.spyOn(app, 'layout').andCallThrough();

    app.register(holovisor, function(err){
      expect(err).toNotExist();
      app.render(function(renderErr){
        spy.restore();
        expect(renderErr).toNotExist();
        expect(spy.calls.length).toEqual(1);
        done();
      });
    });
  });
});
