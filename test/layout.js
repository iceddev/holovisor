'use strict';

const expect = require('expect');

const React = require('react');

const Layout = require('../src/layout');

function noop(){}

const mountpoints = ['appbar', 'editor', 'sidebar', 'overlay'];

describe('Layout', function(){

  // we can't use the TestUtils since we need to force an unmount
  // http://stackoverflow.com/a/23974520
  const container = document.createElement('div');

  afterEach(function(done){
    // we must render a fully valid version of Layout before trying to remove it
    // otherwise it just throws inside this afterEach
    React.render(<Layout addMountpoint={noop} removeMountpoint={noop} />, container);
    React.unmountComponentAtNode(container);
    done();
  });

  it('demands addMountpoint', function(done){
    const spy = expect.spyOn(console, 'warn').andCallThrough();

    function fail(){
      React.render(<Layout removeMountpoint={noop} />, container);
    }

    expect(fail).toThrow('Layout requires addMountpoint during componentDidMount.');

    spy.restore();

    expect(spy.calls.length).toEqual(1);
    expect(spy.calls[0].arguments[0]).toContain('Required prop `addMountpoint`');
    done();
  });

  it('demands removeMountpoint', function(done){
    const spy = expect.spyOn(console, 'warn').andCallThrough();

    function fail(){
      React.render(<Layout addMountpoint={noop} />, container);
      React.unmountComponentAtNode(container);
    }

    expect(fail).toThrow('Layout requires removeMountpoint during componentWillUnmount.');
    expect(spy.calls.length).toEqual(1);
    expect(spy.calls[0].arguments[0]).toContain('Required prop `removeMountpoint`');

    spy.restore();

    done();
  });

  it('calls addMountpoint with the mountpoint name and a DOM Node upon componentDidMount', function(done){
    function addMountpoint(name, domNode){
      expect(name).toExist();
      expect(mountpoints).toInclude(name);
      expect(domNode).toExist();
      expect(domNode instanceof HTMLElement).toEqual(true);
    }

    const spy = expect.createSpy(addMountpoint).andCallThrough();

    React.render(<Layout addMountpoint={spy} removeMountpoint={noop} />, container);
    expect(spy.calls.length).toEqual(4);
    done();
  });

  it('calls removeMountpoint with the mountpoint name componentWillUnmount', function(done){
    function removeMountpoint(name){
      expect(name).toExist();
      expect(mountpoints).toInclude(name);
    }

    const spy = expect.createSpy(removeMountpoint).andCallThrough();

    React.render(<Layout removeMountpoint={spy} addMountpoint={noop} />, container);
    React.unmountComponentAtNode(container);
    expect(spy.calls.length).toEqual(4);
    done();
  });
});
