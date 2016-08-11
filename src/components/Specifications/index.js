import React, {Component, PropTypes} from "react";
import {css} from "aphrodite";
import specs from "./style"

export default class Specifications extends Component {

  render() {
    let {results} = this.props;
    return (
      <ul className={css(specs.wrapper)}>
        {results.wrongResults.map((r, idx) =>
          <li className={css(specs.error, specs.li)} key={idx}>
          <p>{r.spec}</p>
          <p className={css(specs.message)}>{r.message}</p></li>)}

        {results.goodResults.map((r, idx) =>
          <li className={css(specs.pass, specs.li)} key={idx}>
            <p>{r}</p>
          </li>
        )}
      </ul>
    );
  }
}
