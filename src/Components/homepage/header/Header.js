import React from 'react';
import image from '../../../assests/main_image.png';
import homeimage from '../../../assests/homeimage.png';
import homeimg from '../../../assests/home3.png';
import home4 from '../../../assests/home4.png';


import './header.css';

const Header = () => (
  <div className="header3 section__padding" id="home">
    <div className="header-image3">
      <img src={homeimg} />
    </div>
    <div className="header-content3">
      <h1>Hey, I am your College Mate!</h1>
      <p>In such a big college, it's  difficult to find your pen drive if you forget it somewhere. Or, if you want to buy some old laptop because of lack of money, especially for freshers. Isn't it?</p>
      <p>Don't worry, you are at right place where you can report if you have lost something or if you want to buy/sell something.</p>
      <div className="header-content_input3">
      <a href="#feature"><p>Know More</p></a>
      </div>

    </div>
  </div>
);

export default Header;
