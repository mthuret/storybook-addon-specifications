'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aphrodite = require('aphrodite');

exports.default = _aphrodite.StyleSheet.create({
  wrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '-apple-system, ".SFNSText-Regular", "San Francisco", Roboto, "Segoe UI", "Helvetica Neue", "Lucida Grande", sans-serif',
    color: 'rgb(68, 68, 68)',
    fontSize: 12,
    letterSpacing: 1,
    textDecoration: 'none',
    listStyleType: 'none'
  },
  error: {
    ':before': {
      content: "'✘'",
      padding: '3px 5px',
      backgroundColor: 'red'
    }
  },

  li: {
    ':before': {
      marginRight: '5px',
      marginTop: '11px',
      fontSize: '70%',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '12px',
      float: 'left'
    }
  },

  message: {
    backgroundColor: 'rgb(250, 250, 250)',
    padding: '10px',
    margin: '10px'
  },

  pass: {
    ':before': {
      content: "'✔'",
      padding: '4px 5px',
      backgroundColor: 'green'
    }
  }
});