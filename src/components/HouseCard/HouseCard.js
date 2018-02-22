import React from 'react';

const HouseCard = ({ card }) => {
  return (
    <div>
      <h1>Name: {card.name}</h1>
      <p>founded: {card.founded}</p>
      <p>seats: {card.seats}</p>
      <p>titles: {card.titles}</p>
      <p>coat of arms: {card.coatOfArms}</p>
      <p>ancestral weapons: {card.ancestralWeapons}</p>
      <p>words: {card.words}</p>
    </div>
  )        
}

export default HouseCard