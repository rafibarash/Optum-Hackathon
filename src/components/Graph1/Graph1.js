import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }
  ]
};

class Graph1 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        labels: ['Red', 'Green'],
        datasets: [
          {
            data: [0, 100],
            backgroundColor: ['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB']
          }
        ]
      }
    }
  }

  componentDidMount() {
    const val = this.props.percentage * 100
    this.setState({
      data: {
        labels: ['Health', 'Risk'],
        datasets: [
          {
            data: [100-val, val],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384']
          }
        ]
      }
    })
  }

  render() {
    return (
      <div>
        <Doughnut data={this.state.data} />
      </div>
    );
  }
};

export default Graph1;
