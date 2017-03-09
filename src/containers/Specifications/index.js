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
    fetch('/test').then(()=> {
      const socket = new WebSocket('ws://localhost:9002');
      socket.addEventListener('open', () => {
        socket.send("Here's some text that the server is urgently awaiting!");
      });
      socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        console.log('MESSAGE', data);
      });
    })
    this.props.channel.on(EVENT_ID, this._listener);
    this.props.api.onStory((...data) => {
      console.log(data);
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
