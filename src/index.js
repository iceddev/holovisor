'use strict';

const React = require('react');

const Layout = require('./layout');

function holovisor(app, opts, cb){
  const addMountpoint = app.addMountpoint.bind(app);
  const removeMountpoint = app.removeMountpoint.bind(app);

  const Component = (
    <Layout addMountpoint={addMountpoint} removeMountpoint={removeMountpoint} />
  );

  app.layout(function(el, cb){
    React.render(Component, el, cb);
  });

  cb();
}

module.exports = holovisor;
