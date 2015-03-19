'use strict';

const styles = {
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
    flex: '0 0 13rem',
    order: -1,
    display: 'flex',
    zIndex: 4
  },
  overlay: {
    position: 'fixed',
    width: 0,
    height: 0,
    zIndex: 9999
  }
};

module.exports = styles;
