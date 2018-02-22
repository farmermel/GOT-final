/* eslint-disable */
import { setHouseData } from './index';

describe('setHouseData', () => {
  it('returns an action object with type SET_HOUSE_DATA and houseData passed in', () => {
    const mockData = [
      { house: 'Lannister' }
    ]
    const expected = {"houseData": [{"house": "Lannister"}], "type": "SET_HOUSE_DATA"};

    expect(setHouseData(mockData)).toEqual(expected);
  })
})