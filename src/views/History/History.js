import React from 'react';
import { Collapsible, CollapsibleItem, Icon, Row, Input, Button } from 'react-materialize';
import { NavLink } from 'react-router-dom';

// CSS
import './History.css';
//import CollapsibleItem from 'react-materialize/lib/CollapsibleItem';

class History extends React.Component {

  state = {
    'Age': '',
    'Pregnancies': '',
    'Glucose': '',
    'BMI': '',
    'Date': '',
    'Percentage': 0,
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  helper() {
    const value = this.state
    const { onSubmit } = this.props
    onSubmit(value)
    this.setState({
      'Age': '',
      'Pregnancies': '',
      'Glucose': '',
      'BMI': '',
      'Date': '',
      'Percentage': 0,
    })
  }

  handleSubmit = e => {
    const { onSubmit } = this.props
    const {Age, Pregnancies, Glucose, BMI} = this.state

    const apiPath = `http://127.0.0.1:5000/api/?Age=${Age}&Pregnancies=${Pregnancies}&Glucose=${Glucose}&BMI=${BMI}`
    fetch(apiPath)
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((text) => {
        console.log(text)
        this.setState({Percentage: text}, this.helper)
      })

    e.preventDefault();
  }

  render() {
    return (
      <div>
        <Collapsible popout accordion>
          <CollapsibleItem header="Submit New">
            <div>
              <Row>
                <Input s={6} m={12} label="Age" name="Age" onChange={this.handleChange} value={this.state.Age} />
              </Row>
              <Row>
                <Input s={6} m={12} label="Number of Pregnancies" name="Pregnancies" onChange={this.handleChange} value={this.state.Pregnancies} />
              </Row>
              <Row>
                <Input s={6} m={12} label="Glucose" name="Glucose" onChange={this.handleChange} value={this.state.Glucose} />
              </Row>
              <Row>
                <Input s={6} m={12} label="BMI" name="BMI" onChange={this.handleChange} value={this.state.BMI} />
              </Row>
              <Row>
                <Input s={6} m={12} label="Date" name="Date" onChange={this.handleChange} value={this.state.Date} />
              </Row>
              <Row>
                <Button waves="light" onClick={this.handleSubmit}>
                  Save<Icon right>done_all</Icon>
                </Button>
              </Row>
            </div>
          </CollapsibleItem>
        </Collapsible>
        {this.props.data}
        <List cards={this.props.dataSet.data}>
        </List>
      </div>
    );
  };
}
export default History;

class List extends React.Component {
  renderItem = (card) => {
    return (
      <CollapsibleItem header={card.Date} icon={card.Percentage > .5 ? 'warning' : null}>
        <div>
          <Row>
            <div>Percentage Risk: {card.Percentage}</div>
          </Row>
          <Row>
            <div>Age: {card.Age}</div>
          </Row>
          <Row>
            <div>Number of Pregnancies: {card.Pregnancies} </div>
          </Row>
          <Row>
            <div>Glucose: {card.Glucose}</div>
          </Row>
          <Row>
            <div>BMI: {card.BMI}</div>
          </Row>
        </div>
      </CollapsibleItem>
    );
  };

  render() {

    return (
      <Collapsible>
        {this.props.cards ? this.props.cards.map(this.renderItem) : <div></div>}
      </Collapsible>
    );
  }



}
