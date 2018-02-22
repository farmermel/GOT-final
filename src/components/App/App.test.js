import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import * as apiCalls from '../../helpers/apiCalls';


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
      apiCalls.firstApiCall = jest.fn().mockImplementation(() => {
        return [{ house: 'greyjoy'}]
      })

      expect(apiCalls.firstApiCall).not.toHaveBeenCalled();
      wrapper.instance().getHouses();
      expect(apiCalls.firstApiCall).toHaveBeenCalled();
    })

    it('calls setHouseData', async () => {
      apiCalls.firstApiCall = jest.fn().mockImplementation(() => {
        return [{ house: 'greyjoy'}]
      })
      const expected = [{"house": "greyjoy"}];

      expect(wrapper.instance().props.setHouseData).not.toHaveBeenCalled();
      await wrapper.instance().getHouses();
      expect(wrapper.instance().props.setHouseData).toHaveBeenCalledWith(expected);
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
    const mockDispatch = jest.fn();

    const mapped = mapDispatchToProps(mockDispatch);
    mapped.setHouseData();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  })
})