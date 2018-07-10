import React from 'react';
import Dylan from '../../assets/img/dylan.jpg';
import Rafi from '../../assets/img/rafi.jpg';
import Connor from '../../assets/img/connor.jpg';
import Quinn from '../../assets/img/quinn.jpg';
import Nick from '../../assets/img/nick.jpg';
import './Profile.css';
import {Row, Col} from 'react-materialize';

function Notifications(props) {
  return (
    <div className='notifications'>
      <h2>Notifications</h2>
      {props.data[0].Percentage > 0.5 
        ? <p className='warning'>WARNING: high risk for diabetes</p> 
        : <p className='good'>No Warnings ☺️</p>}
    </div>
  )
}

class Profile extends React.Component {
  render() {
    let ProfilePic;
    let name = this.props.userInfo.name;
    if (name === 'Dylan') {
      ProfilePic = Dylan;
    } else if (name === 'Rafi') {
      ProfilePic = Rafi;
    } else if (name === 'Connor') {
      ProfilePic = Connor;
    } else if (name === 'Quinn') {
      ProfilePic = Quinn;
    } else {
      ProfilePic = Nick;
    }
    return(
      <div>
        {this.props.userInfo.name === 'Dylan'}
        <h1>Hello {this.props.userInfo.name}!</h1> 
        <Row>
        <Col m={6}><img src={ProfilePic} alt='profile pic' height='400px' width='400px'/></Col>
        <Col m={6}><Notifications data={this.props.data}/></Col>
        </Row>
      </div>
    )
  }
}

export default Profile