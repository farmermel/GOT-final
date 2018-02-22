import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';


describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App houseData={[]}
                          setHouseData={jest.fn()} />)
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('getHouses', () => {
    it('calls firstApiCall', () => {

    })

    it('calls setHouseData', () => {

    })
  })

  describe('mapStateToProps', () => {
    it('maps state to props', () => {
      const mockState = {
        houseData: [{ house: 'greyjoy'}]
      }

      const mapped = mapStateToProps(mockState);
      expect(mockState.houseData).toEqual(mapped.houseData);
    })
  })

  describe('mapDispatchToProps', () => {

  })
})