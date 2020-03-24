import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import ChartWrapper from "./ChartWrapper.js";
import Table from "./Table.js";

class App extends React.Component {
  state = {
    data: [],
    activeName: null
  }

  componentWillMount() {
    this.setState({data: [
        {"age":"10.1","height":"152.1","name":"Tony"},
        {"age":"12.1","height":"148.1","name":"Jessica"},
        {"age":"9.1","height":"135.1","name":"Andrew"},
        {"age":"10.1","height":"145.1","name":"Emily"},
        {"age":"11.1","height":"141.1","name":"Richard"}]});
    
  }

  updateName = (activeName) => {
    this.setState({ activeName: activeName});
  }

  updateData = (data) => {
    this.setState({ data: data });
  }

  renderChart() {
    if (this.state.data.length === 0) {
      return "No data yet"
    }
    return <ChartWrapper data={this.state.data} updateName={this.updateName} />
  }

  render() {
    return (
      <div className="App">
        <Navbar bg="light">
          <Navbar.Brand>Student Height Scatterplot</Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Col md={6} xs={12}>{this.renderChart()}</Col>
            <Col md={6} xs={12}><Table data={this.state.data} updateData={this.updateData} activeName={this.state.activeName}/></Col>
          </Row> 
        </Container>
      </div>
    );
  }
}

export default App;