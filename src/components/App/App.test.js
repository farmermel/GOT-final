/* eslint-disable */
import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './App';
import * as apiCalls from '../../helpers/apiCalls';


describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App houseData={[]}
                          setHouseData={jest.fn()} />,
                          { disableLifecycleMethods: true })
  })

  it('matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('componentDidMount', () => {
    beforeAll(() => {
      wrapper.instance().cleanHouseData = jest.fn().mockImplementation(() => {
        return [{
          "ancestralWeapons": "Ice, HeartsBane", 
          "seats": "Riverrun, Winterfell", 
          "titles": "Lord of the North"
        }]
      })
      Promise.all = jest.fn().mockImplementation(() => {
        return [{
          "ancestralWeapons": "Ice, HeartsBane", 
          "seats": "Riverrun, Winterfell", 
          "titles": "Lord of the North"
        }]
      })
    })
    it('calls firstApiCall', () => {
      wrapper.instance().cleanHouseData = jest.fn().mockImplementation(() => {
        return [{
          "ancestralWeapons": "Ice, HeartsBane", 
          "seats": "Riverrun, Winterfell", 
          "titles": "Lord of the North"
        }]
      })
      apiCalls.firstApiCall = jest.fn().mockImplementation(() => {
        return [{ house: 'greyjoy'}]
      })

      expect(apiCalls.firstApiCall).not.toHaveBeenCalled();
      wrapper.instance().componentDidMount();
      expect(apiCalls.firstApiCall).toHaveBeenCalled();
    })

    it('calls cleanHouseData', async () => {
      wrapper.instance().cleanHouseData = jest.fn().mockImplementation(() => {
        return [{
          "ancestralWeapons": "Ice, HeartsBane", 
          "seats": "Riverrun, Winterfell", 
          "titles": "Lord of the North"
        }]
      })
      expect(wrapper.instance().cleanHouseData).not.toHaveBeenCalled();
      await wrapper.instance().componentDidMount();
      expect(wrapper.instance().cleanHouseData).toHaveBeenCalled();

    })

    it('calls setHouseData', async () => {
      apiCalls.firstApiCall = jest.fn().mockImplementation(() => {
        return [{ house: 'greyjoy'}]
      })
      wrapper.instance().cleanHouseData = jest.fn().mockImplementation(() => {
        return [{
          "ancestralWeapons": "Ice, HeartsBane", 
          "seats": "Riverrun, Winterfell", 
          "titles": "Lord of the North"
        }]
      })
      const expected = [{"ancestralWeapons": "Ice, HeartsBane", "seats": "Riverrun, Winterfell", "titles": "Lord of the North"}];

      expect(wrapper.instance().props.setHouseData).not.toHaveBeenCalled();
      await wrapper.instance().componentDidMount();
      expect(wrapper.instance().props.setHouseData).toHaveBeenCalledWith(expected);
    })

    it('sets state with error message if something fails', async () => {
      apiCalls.firstApiCall = jest.fn().mockImplementation(() => {
        throw new Error('failed to fetch GOT facts!')
      })
      wrapper.instance().cleanHouseData = jest.fn().mockImplementation(() => {
        return [{
          "ancestralWeapons": "Ice, HeartsBane", 
          "seats": "Riverrun, Winterfell", 
          "titles": "Lord of the North"
        }]
      })
      const expected = {"error": Error('failed to fetch GOT facts!')};
      await wrapper.instance().componentDidMount();
      expect(wrapper.instance().state).toEqual(expected);
    })
  })

  describe('cleanHouseData', () => {
    beforeAll(() => {
      apiCalls.getSwornMembers = jest.fn().mockImplementation(() => {
        return 'string, of, people'
      })
    })

    it.skip('takes in house data and turns arrays into joined strings', async () => {
      apiCalls.getSwornMembers = jest.fn().mockImplementation( () => {
        return 'string, of, people'
      })

      const dirtyData = [{
        ancestralWeapons: ['Ice', 'HeartsBane'],
        seats: ['Riverrun', 'Winterfell'],
        titles: ['Lord of the North']
      }]

      const cleanData = [{
        ancestralWeapons: "Ice, HeartsBane", 
        seats: "Riverrun, Winterfell", 
        titles: "Lord of the North",
        id: '0',
        swornMembers: 'string, of, people'
      }]
      const returned = await wrapper.instance().cleanHouseData(dirtyData);
      expect(Promise.all(returned)).toEqual(cleanData);
    })

    it.skip('sets state with error message if something fails', async () => {
      const dirtyData = [{
        ancestralWeapons: ['Ice', 'HeartsBane'],
        seats: ['Riverrun', 'Winterfell'],
        titles: ['Lord of the North']
      }]
      apiCalls.getSwornMembers = jest.fn().mockImplementation(() => {
        throw new Error('failed to fetch sworn members!')
      })
      const expected = {"error": Error('failed to fetch sworn members!')};
      const returned = await wrapper.instance().cleanHouseData(dirtyData);
      expect(wrapper.instance().state).toEqual(expected);
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