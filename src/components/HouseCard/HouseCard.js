import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './HouseCard.css';

const HouseCard = ({ card, clicked }) => {
  return (
    <Link to={{pathname:`house/${card.id}`}}>
      <div className='house-card'>
        <h1>Name: {card.name}</h1>
        <h2>{card.words || ''}</h2>
        <h3>Founded: {card.founded || 'N/A'}</h3>
        <p>seats: {card.seats}</p>
        <p>titles: {card.titles}</p>
        <p>coat of arms: {card.coatOfArms}</p>
        <p>ancestral weapons: {card.ancestralWeapons}</p>
        {
          clicked && <p>sworn members: {card.swornMembers}</p>
        }
      </div>
    </Link>
  );  
};

HouseCard.propTypes = {
  card: PropTypes.shape({
    name: PropTypes.string,
    founded: PropTypes.string,
    seats: PropTypes.string,
    titles: PropTypes.string,
    coatOfArms: PropTypes.string,
    ancestralWeapons: PropTypes.string,
    words: PropTypes.string
  }),
  clicked: PropTypes.bool.isRequired
};

export default HouseCard;