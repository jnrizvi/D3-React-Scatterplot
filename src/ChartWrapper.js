import React from "react";
import D3Chart from "./D3Chart.js";

// this class is the bridge between React code and D3 code
class ChartWrapper extends React.Component {
  constructor() {
    super();
    this.myRef = React.createRef();
  }

    // executes once as soon as the component is mounted to the screen
  componentDidMount() {
    // refers to the ref in the div
    this.setState({
      chart: new D3Chart(this.myRef.current, this.props.data, this.props.updateName)
    });
  }

  // allows to specify whether or not to render a react component when something changes
  shouldComponentUpdate() {
    // return false to disable the usual behaviour of React, stopping the component from automatically being re-rendered 
    return false;
  }

  // run as soon as new props become available for a component, but before any updates take place 
  componentWillReceiveProps(nextProps) {
    this.state.chart.update(nextProps.data);
  }

  render() {
    // An empty div, which we append a new D3Chart object to when a component first mounts
    return <div className="chart-area" ref={this.myRef} />;
  }
}

export default ChartWrapper;