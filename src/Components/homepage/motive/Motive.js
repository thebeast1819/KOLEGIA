import React from 'react';
import motive_image from '../../../assests/motive.png';
import './motive.css';

const Motive = () => (
  <div style={{width:"100%"}}>
  <div className="motive3" id="motive">
    <div className="motive-content3">
      <h1>Our Motive</h1>
      <p>In such a big college, it's so difficult to find your pendrive if you forget it somewhere. Or, if you want to buy some old laptop because of lack of money, especially for freshers. Isn't it?</p>
      <p>Don't worry, you are at right place where you can report if you have lost something or if you want to buy/sell something.</p>
    </div>
    <div className="motive-image3">
      <img src={motive_image} />
    </div>
  </div>
  </div>
);

export default Motive;
