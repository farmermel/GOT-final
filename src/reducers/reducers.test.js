/* eslint-disable */
import { houseReducer } from './houseReducer';

describe('houseReducer', () => {
  it('returns housedata on action if action type matches', () => {
    const mockAction = {
      type: 'SET_HOUSE_DATA',
      houseData: [{house: 'Stark'}]
    }
    const expected = [{"house": "Stark"}];

    expect(houseReducer([], mockAction)).toEqual(expected);
  })

  it('returns state unchanged if action type does not match', () => {
    const mockAction = {
      type: 'NO_MATCH',
      houseData: [{house: 'Stark'}]
    }

    expect(houseReducer([], mockAction)).toEqual([]);
  })
})