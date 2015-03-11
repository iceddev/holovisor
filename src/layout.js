'use strict';

const React = require('react');

const styles = require('./styles');

class Layout extends React.Component {
  componentDidMount(){
    this.props.addMountpoint('appbar', React.findDOMNode(this._appbar));
    this.props.addMountpoint('sidebar', React.findDOMNode(this._sidebar));
    this.props.addMountpoint('editor', React.findDOMNode(this._editor));
  }

  componentWillUnmount(){
    this.props.removeMountpoint('sidebar');
    this.props.removeMountpoint('main');
  }

  render(){
    return (
      <div style={styles.container}>
        <div ref={(ref) => this._appbar = ref} style={styles.appbar}></div>
        <div style={styles.main}>
          <main ref={(ref) => this._editor = ref} style={styles.editor}></main>
          <div ref={(ref) => this._sidebar = ref} style={styles.sidebar}></div>
        </div>
      </div>
    );
  }
}

module.exports = Layout;
