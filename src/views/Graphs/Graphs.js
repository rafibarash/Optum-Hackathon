import React, { Component } from 'react';
import { Row, Col, Collection, CollectionItem } from 'react-materialize';

// Components
import Graph1 from '../../components/Graph1/Graph1';
import Graph2 from '../../components/Graph2/Graph2';
import Graph3 from '../../components/Graph3/Graph3';
import Graph4 from '../../components/Graph4/Graph4';

// CSS
import './Graphs.css';

class Graphs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showGraph: [true, false, false, false]
    };

    this.setGraph = this.setGraph.bind(this);
  }

  setGraph(num) {
    if (num === 0) {
      this.setState({
        showGraph: [true, false, false, false]
      });
    } else if (num === 1) {
      this.setState({
        showGraph: [false, true, false, false]
      });
    } else if (num === 2) {
      this.setState({
        showGraph: [false, false, true, false]
      });
    } else if (num === 3) {
      this.setState({
        showGraph: [false, false, false, true]
      });
    } else {
      this.setState({
        showGraph: [true, false, false, false]
      });
    }
  }

  render() {
    return (
      <div className="graphs">
        <Row>
          <Col m={4}>
            <Collection>
              <CollectionItem href="#" onClick={() => this.setGraph(0)}>
                Current Risk
              </CollectionItem>
              <CollectionItem href="#" onClick={() => this.setGraph(1)}>
                Risk over Time
              </CollectionItem>
              <CollectionItem href="#" onClick={() => this.setGraph(2)}>
                Glucose over Time
              </CollectionItem>
              <CollectionItem href="#" onClick={() => this.setGraph(3)}>
                BMI over Time
              </CollectionItem>
            </Collection>
          </Col>
          {this.props.dataSet.data 
          ?
          <Col m={8}>
              {this.state.showGraph[0] ? <Graph1 percentage={this.props.dataSet.data[0].Percentage}/> : null}
            {this.state.showGraph[1] ? <Graph2 dataSet={this.props.dataSet}/> : null}
            {this.state.showGraph[2] ? <Graph3 dataSet={this.props.dataSet}/> : null}
            {this.state.showGraph[3] ? <Graph4 dataSet={this.props.dataSet}/> : null}
          </Col>
          : <div></div>}
        </Row>
      </div>
    );
  }
}

export default Graphs;
