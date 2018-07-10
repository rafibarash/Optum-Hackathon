import React from 'react';
import Profile from '../../components/Profile/Profile'

// Components
import Login from '../../components/Login/Login';

// CSS
import './Home.css';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        {this.props.user == 'none' ? <Login setUser={this.props.setUser} /> : <Profile userInfo={this.props.dataSet.userInfo} data={this.props.dataSet.data}/>}
      </div>
    );
  }
};

export default Home;
