import React from 'react';
import PropTypes from 'prop-types';

const HouseCard = ({ card }) => {
  return (
    <div>
      <h1>Name: {card.name}</h1>
      <p>founded: {card.founded || 'no data available'}</p>
      <p>seats: {card.seats}</p>
      <p>titles: {card.titles}</p>
      <p>coat of arms: {card.coatOfArms}</p>
      <p>ancestral weapons: {card.ancestralWeapons}</p>
      <p>words: {card.words || 'no data available'}</p>
    </div>
  );  
};

HouseCard.propTypes = {
  card: PropTypes.objectOf(PropTypes.string)
};

export default HouseCard;