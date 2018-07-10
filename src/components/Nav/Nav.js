import React from 'react';
import { Navbar } from 'react-materialize';
import { NavLink } from 'react-router-dom';

// CSS
import './Nav.css';

const Nav = () => {
  return (
    <Navbar brand="Diabetes Risk Tracker" className='navbar' right>
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="active" to="/history">
          Health History
        </NavLink>
      </li>
      <li>
        <NavLink exact activeClassName="active" to="/graphs">
          Graphs
        </NavLink>
      </li>
    </Navbar>
  );
};

export default Nav;
