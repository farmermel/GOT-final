/* eslint-disable */
import { firstApiCall, getSwornMembers } from './apiCalls';

describe('apiCalls', () => {
  describe('firstApiCall', () => {
    const mockData = [
      { Tyrells: 'flowers' },
      { Lannisters: 'lions' }
    ]

    it('calls fetch with url', () => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => {
            return mockData
          }
        })
      })
      expect(window.fetch).not.toHaveBeenCalled();
      firstApiCall();
      expect(window.fetch).toHaveBeenCalledWith('http://localhost:3001/api/v1/houses');
    })

    it('returns an array of fetched houses', async () => {
      expect(await firstApiCall()).toEqual(mockData);
    })

    it.skip('throws an error if status is not good', async () => {
        window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 500,
            json: () => {}
          })
        )
        expect(await firstApiCall()).toEqual(Error());
    })
  })

  describe('getSwornMembers', () => {
    const mockData = [
      {name: 'Lyanna'},
      {name: 'Nymeria'}
    ]

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.resolve({
          status: 200,
          json: () => {
            return mockData
          }
        })
      })
      Promise.all = jest.fn().mockImplementation(() => {
        return mockData
      })
    })

    it('calls fetch', async () => {
      expect(window.fetch).not.toHaveBeenCalled();
      await getSwornMembers(mockData);
      expect(window.fetch).toHaveBeenCalled();
    })

    it('returns a string of comma seperated names', async () => {
      expect(await getSwornMembers(mockData)).toEqual('Lyanna, Nymeria');
    })
  })
})