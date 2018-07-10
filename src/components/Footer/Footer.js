import React from 'react';

import { Footer as MaterialFooter } from 'react-materialize';

// CSS
import './Footer.css';

const Footer = () => (
  <MaterialFooter className="footer" copyrights="&copy; Bofa Hacks 2018" className="footer">
    <h6 className="white-text">
      Made with
      <span role="img" aria-label="heart">
        ❤️
      </span>
      at Optum Global Hackathon 2018
    </h6>
  </MaterialFooter>
);

export default Footer;
