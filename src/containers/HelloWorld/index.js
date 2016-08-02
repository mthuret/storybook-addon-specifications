import React, { Component } from 'react';
import HelloWorldComponent from '../../components/HelloWorld/';
import { EVENT_ID } from '../../';

export default class HelloWorld extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {text: ''};
    this._listener = d => this.setState({text: d.text});
  }

  componentDidMount() {
    this.props.channel.on(EVENT_ID, this._listener);
  }

  componentWillUnmount() {
    this.props.channel.removeListener(EVENT_ID, this._listener);
  }

  render() {
    const text = this.state.text;
    return <HelloWorldComponent text={text} />;
  }
}
