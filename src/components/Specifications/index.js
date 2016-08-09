import React, { Component, PropTypes } from 'react';
import style from './style';

export default class Specifications extends Component {
  static propTypes = {
  };

  render() {
    let {results} = this.props;
    return (
      <ul style={style.wrapper}>
        {results.wrongResults.map((r, idx)=><li key={idx}>
          <p><span style={style.specs.errors}>Error :</span> {r.spec}</p>
          <p style={style.specs.errors.message}>{r.message}</p></li>)}
        {results.goodResults.map((r, idx)=><li key={idx}><span style={style.specs.pass}>Pass : </span>{r}</li>)}
      </ul>
    );
  }
}
