'use strict';

const React = require('react');
const invariant = require('invariant');

const styles = require('./styles');

class Layout extends React.Component {
  componentDidMount(){
    const add = this.props.addMountpoint;
    invariant(add, 'Layout requires addMountpoint during componentDidMount.');
    add('appbar', React.findDOMNode(this._appbar));
    add('sidebar', React.findDOMNode(this._sidebar));
    add('editor', React.findDOMNode(this._editor));
  }

  componentWillUnmount(){
    const remove = this.props.removeMountpoint;
    invariant(remove, 'Layout requires removeMountpoint during componentWillUnmount.');
    remove('appbar');
    remove('sidebar');
    remove('editor');
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

Layout.propTypes = {
  addMountpoint: React.PropTypes.func.isRequired,
  removeMountpoint: React.PropTypes.func.isRequired
};

module.exports = Layout;
