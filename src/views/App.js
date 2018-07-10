import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Components
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import Form from '../components/Form/Form';
import Graphs from '../views/Graphs/Graphs';
import History from '../views/History/History';

// Views
import Home from './Home/Home';

// CSS
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: 'none',
      percentage: 0,
      dataSets: {
        'none': {
          'data': null,
        },
        'connor': {
          'userInfo': {
            'name': 'Connor',
            'imgurl': '../../assets/img/connor.jpg'
          },
          'data': [
            { 'Glucose': 70, 'BMI': 35, 'Pregnancies': 3, 'Age': 50, 'Percentage': 0.9587695, 'Date': 'February 2025' },
            { 'Glucose': 100, 'BMI': 32, 'Pregnancies': 2, 'Age': 45, 'Percentage': 0.31611672, 'Date': 'February 2020'},
            { 'Glucose': 120, 'BMI': 25, 'Pregnancies': 0, 'Age': 35, 'Percentage': 0.2650436, 'Date': 'February 2010'},
            { 'Glucose': 140, 'BMI': 20, 'Pregnancies': 0, 'Age': 25, 'Percentage': 0.363603, 'Date': 'February 2000' },
          ]
        },
        'dylan': {
          'userInfo': {
            'name': 'Dylan',
            'imgurl': '../assests/img/dylan.jpg'
          },
          'data': [
            { 'Glucose': 130, 'BMI': 25, 'Pregnancies': 0, 'Age': 50, 'Percentage': 0.47824043, 'Date': 'January 2025' },
            { 'Glucose': 100, 'BMI': 30, 'Pregnancies': 0, 'Age': 40, 'Percentage': 0.3015888, 'Date': 'January 2015'},
            { 'Glucose': 120, 'BMI': 19, 'Pregnancies': 0, 'Age': 30, 'Percentage': 0.3345994, 'Date': 'January 2005'},
            { 'Glucose': 140, 'BMI': 20, 'Pregnancies': 0, 'Age': 25, 'Percentage': 0.363603, 'Date': 'January 2000' },
          ]
        },
        'nick': {
          'userInfo': {
            'name': 'Nick',
            'imgurl': 'assets/img/nick.jpg'
          },
          'data': [
            { 'Glucose': 70, 'BMI': 35, 'Pregnancies': 3, 'Age': 50, 'Percentage': 0.9587695, 'Date': 'February 2025' },
            { 'Glucose': 140, 'BMI': 20, 'Pregnancies': 0, 'Age': 25, 'Percentage': 0.363603, 'Date': 'February 2000' },
          ]
        },
        'rafi': {
          'userInfo': {
            'name': 'Rafi',
            'imgurl': '../assests/img/rafi.jpg'
          },
          'data': [
            { 'Glucose': 130, 'BMI': 25, 'Pregnancies': 0, 'Age': 50, 'Percentage': 0.47824043, 'Date': 'January 2025' },
            { 'Glucose': 140, 'BMI': 20, 'Pregnancies': 0, 'Age': 25, 'Percentage': 0.363603, 'Date': 'January 2000' },
          ]
        },
        'quinn': {
          'userInfo': {
            'name': 'Quinn',
            'imgurl': '../assests/img/quinn.jpg'
          },
          'data': [
            { 'Glucose': 130, 'BMI': 25, 'Pregnancies': 0, 'Age': 50, 'Percentage': 0.47824043, 'Date': 'January 2025' },
            { 'Glucose': 140, 'BMI': 20, 'Pregnancies': 0, 'Age': 25, 'Percentage': 0.363603, 'Date': 'January 2000' },
          ]
        },
      }
    }

    this.setPercentage = this.setPercentage.bind(this)
    this.setUser = this.setUser.bind(this)
    this.onAddCard = this.onAddCard.bind(this)
  }

  setPercentage(percentage) {
    this.setState({
      percentage: percentage
    })
  }

  setUser(user) {
    this.setState({
      user: user
    })
  }

  onAddCard(card) {
    const cards = (this.state.dataSets[this.state.user]).data
    let new_datasets = this.state.dataSets
    new_datasets[this.state.user].data = [card, ...cards]

    this.setState({
      dataSets: new_datasets
    })
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className="main">
            <div class="forms">
              <Route exact path="/" render={(props) => <Home {...props} setUser={this.setUser} user={this.state.user} dataSet={this.state.dataSets[this.state.user]}></Home>} />
              <Route exact path="/form" render={(props) => <Form {...props} setPercentage={this.setPercentage} dataSet={this.state.dataSets[this.state.user]}></Form>} />
              <Route exact path="/history" render={(props) => <History {...props} dataSet={this.state.dataSets[this.state.user]} onSubmit={this.onAddCard} />} />
            </div>
            <Route exact path="/graphs" render={(props) => <Graphs {...props} percentage={this.state.percentage} dataSet={this.state.dataSets[this.state.user]}></Graphs>} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
};

export default App;
