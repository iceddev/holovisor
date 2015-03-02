'use strict';

var React = require('react');

var styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column'
  },
  appbar: {
    height: '56px'
  },
  main: {
    display: 'flex',
    flex: 1
  },
  editor: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column'
  },
  sidebar: {
    flex: '0 0 17em',
    order: -1,
    display: 'flex',
    zIndex: 4
  }
};

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
      <div style={styles.container}>
        <div ref="appbar" style={styles.appbar}></div>
        <div style={styles.main}>
          <main ref="editor" style={styles.editor}>blah</main>
          <div ref="sidebar" style={styles.sidebar}></div>
        </div>
      </div>
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
