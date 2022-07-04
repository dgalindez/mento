const { WEATHER } = require('./constants');
const weatherApi = require('./weatherApi');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('weatherApi', () => {
  it('Makes API call with correct path', async () => {
    const url = `${WEATHER.url}?lat=1&lon=1&units=standard&appid=${WEATHER.apiKey}`;
    const res = await weatherApi(1, 1, 'standard');
    expect(fetch).toHaveBeenCalledWith(url);
    expect(res).toEqual({ success: true });
  });
});
