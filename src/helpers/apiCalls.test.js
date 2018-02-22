/* eslint-disable */
import { firstApiCall } from './apiCalls';

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
    window.fetch = jest.fn().mockImplementation(() => {
      return Promise.reject({
        status: 500
      })
    })
    expect(await firstApiCall()).toEqual('');

  })
})