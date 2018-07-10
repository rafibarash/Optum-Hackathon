import React from 'react';
import { Row, Input, Button, Icon } from 'react-materialize';

// CSS
import './Form.css';

class Form extends React.Component {
  state = {
    percentage: '0',
    age: '0',
    pregnancies: '0',
    glucose: '0',
    bmi: '0', 
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    const {age, pregnancies, glucose, bmi} = this.state;
    const apiPath = `http://127.0.0.1:5000/api/?Age=${age}&Pregnancies=${pregnancies}&Glucose=${glucose}&BMI=${bmi}` 
    fetch(apiPath)
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((text) => {
        console.log(text)
        this.props.setPercentage(text)
        this.setState({
          percentage: text 
        })
      })
  }

  render() {
    return (
      <div className="form">
        <h1>Will you die from diabetes ?</h1>
        <Row>
          <Input s={6} m={12} label="Age" name="age" onChange={this.handleChange} /> </Row>
        <Row>
          <Input s={6} m={12} label="Number of Pregnancies" name="pregnancies" onChange={this.handleChange} />
        </Row>
        <Row>
          <Input s={6} m={12} label="Glucose" name="glucose" onChange={this.handleChange} />
        </Row>
        {/* <Row>
          <Input s={6} m={12} label="Blood Pressure" />
        </Row>
        <Row>
          <Input s={6} m={12} label="Skin Thickness" />
        </Row>
        <Row>
          <Input s={6} m={12} label="Insulin" />
        </Row> */}
        <Row>
          <Input s={6} m={12} label="BMI" name="bmi" onChange={this.handleChange} />
        </Row>
        {/* <Row>
          <Input s={6} m={12} label="Diabetes Pedigree Function" />
        </Row> */}
        <Row>
          <Button waves="light" onClick={this.handleSubmit}>
            Let's find out<Icon right>done_all</Icon>
          </Button>
        </Row>
      </div>
    );
  }
}

export default Form;
