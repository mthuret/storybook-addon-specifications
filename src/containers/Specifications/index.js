import React, {Component} from "react";
import SpecificationsComponent from "../../components/Specifications/";
import {EVENT_ID} from "../../";


export default class Specifications extends Component {
  constructor(props, ...args) {
    super(props, ...args);
    this.state = { storyName: null, results: { wrongResults: [], goodResults: [] } };
    this._listener = ({ asyncResultsUpdate, storyName, results }) => {
      if (asyncResultsUpdate) {
        if (storyName === this.state.storyName) {
          this.setState({ results });
        }
      } else {
        this.setState({ storyName, results });
      }
    }
  }

  componentDidMount() {
    this.props.channel.on(EVENT_ID, this._listener);
    this.props.api.onStory((data) => this.setState({ storyName: null, results: { wrongResults: [], goodResults: [] } }));
  }

  componentWillUnmount() {
    this.props.channel.removeListener(EVENT_ID, this._listener);
  }

  render() {
    const results = this.state.results;
    const { active } = this.props;

    return active ? (
      <SpecificationsComponent results={results} />
    ) : null;
  }
}
