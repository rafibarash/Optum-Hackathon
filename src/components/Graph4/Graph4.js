import React from 'react';
import { Line } from 'react-chartjs-2';

class Graph4 extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            label: 'Risk over Time',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff', pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
          }
        ]
      }
    }
  }

  componentDidMount() {
    let newLabels = []
    let newData = []
    this.props.dataSet.data.map((card) => {
      newLabels.unshift(card.Date)
      newData.unshift(card.BMI)
    })
    let newDataObj = this.state.data
    newDataObj.labels = newLabels
    newDataObj.datasets[0].data = newData
    this.setState({
      data: newDataObj
    })
  }
  render() {
    return (
      <div>
        <Line data={this.state.data} />
      </div>
    );
  }
}

export default Graph4;