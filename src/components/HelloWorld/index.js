import React, { Component, PropTypes } from 'react';
import style from './style';

export default class HelloWorld extends Component {
  static propTypes = {
    text: PropTypes.string,
  };

  render() {
    return (
      <div style={style.wrapper}>
        {this.props.text}
      </div>
    );
  }
}
