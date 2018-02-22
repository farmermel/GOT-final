/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import HouseCard from './HouseCard';

describe('HouseCard', () => {
  const wrapper = shallow(<HouseCard card={{house: 'greyjoy'}} />)
  it('matches snapshot', () => {

  })
})