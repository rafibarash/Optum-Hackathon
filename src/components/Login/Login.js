import React from 'react';

import { Row, Input, Button} from 'react-materialize';
import { BrowserRouter as Router, Link} from 'react-router-dom';

class Login extends React.Component {
  state = {
    user: '',
    password: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name] : e.target.value })
  }

  handleSubmit = e => {
    this.props.setUser(this.state.user)
  }

  render() {
    return (
      <Row>
        <h1>Login</h1>
        <Input s={6} m={12} placeholder="Username" name="user" onChange={this.handleChange}/>
        <Input s={6} m={12} type="password" placeholder="Password" onChange={this.handleChange} />
        <Button onClick={this.handleSubmit} waves="light">Submit</Button>

      </Row>
    );
  }
}

export default Login;
