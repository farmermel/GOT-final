import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './HouseCard.css';

const HouseCard = ({ card, clicked }) => {
  return (
    <Link to={{pathname:`house/${card.id}`}}>
      <div className='house-card'>
        <h1>Name: {card.name}</h1>
        <p>founded: {card.founded || 'no data available'}</p>
        <p>seats: {card.seats}</p>
        <p>titles: {card.titles}</p>
        <p>coat of arms: {card.coatOfArms}</p>
        <p>ancestral weapons: {card.ancestralWeapons}</p>
        <p>words: {card.words || 'no data available'}</p>
        {
          clicked && <p>sworn members: {card.swornMembers}</p>
        }
      </div>
    </Link>
  );  
};

HouseCard.propTypes = {
  card: PropTypes.objectOf(PropTypes.string),
  clicked: PropTypes.bool.isRequired
};

export default HouseCard;