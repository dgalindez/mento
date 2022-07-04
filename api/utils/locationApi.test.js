const locationApi = require('./locationApi');
const { LOCATION } = require('./constants');

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('locationApi', () => {
  it('Makes API call with correct path', async () => {
  const url = `${LOCATION.url}?postalcode=A-98001&country=US&username=${LOCATION.username}`;
    const res = await locationApi('A-98001', 'US');
    expect(fetch).toHaveBeenCalledWith(url);
    expect(res).toEqual({ success: true });
  });
});
