import React from 'react';
import './card.css';

const Card = ({ imgUrl, text}) => (
  <div className="feature_card3">
    <div className="feature_card-image3">
      <img src={imgUrl} alt="card_image" />
    </div>
    <div className="feature_card-content3">
        {text}
    </div>
  </div>
);

export default Card;
