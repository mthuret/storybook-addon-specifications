import React, {Component} from "react";
import SpecificationsComponent from "../../components/Specifications/";
import {EVENT_ID} from "../../";


export default class Specifications extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = {results: {wrongResults: [], goodResults: []}};
    this._listener = d => this.setState({results: d.results});
  }

  componentDidMount() {
    this.props.channel.on(EVENT_ID, this._listener);
    this.props.api.onStory((data) => {
      this.setState({ results: { wrongResults: [], goodResults: [] } });
    });
  }

  componentWillUnmount() {
    this.props.channel.removeListener(EVENT_ID, this._listener);
  }

  render() {
    const results = this.state.results;
    return <SpecificationsComponent results={results}/>;
  }
}
