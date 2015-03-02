'use strict';

var React = require('react');
var AppCanvas = require('material-ui').AppCanvas;

var Layout = React.createClass({
  componentDidMount: function(){
    this.props.addMountpoint('appbar', this.refs.appbar.getDOMNode());
    this.props.addMountpoint('sidebar', this.refs.sidebar.getDOMNode());
    this.props.addMountpoint('editor', this.refs.editor.getDOMNode());
  },
  componentWillUnmount: function(){
    this.props.removeMountpoint('sidebar');
    this.props.removeMountpoint('main');
  },
  render: function(){
    return (
      <AppCanvas className="container">
        <div ref="appbar" className="appbar"></div>
        <div className="main">
          <main ref="editor" className="editor">blah</main>
          <div ref="sidebar" className="sidebar"></div>
        </div>
      </AppCanvas>
    );
  }
});

function holovisor(app, opts, cb){
  var addMountpoint = app.addMountpoint.bind(app);
  var removeMountpoint = app.removeMountpoint.bind(app);
  var Component = (
    <Layout addMountpoint={addMountpoint} removeMountpoint={removeMountpoint} />
  );

  app.layout(function(el, cb){
    React.render(Component, el, cb);
  });

  cb();
}

module.exports = holovisor
