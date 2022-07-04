const { ERRORS } = require('../utils/constants');

const buildError = require('./buildError');

describe('buildError', () => {
  it('Should build Error if key exists', () => {
    const { error, errorKey } = buildError(ERRORS.weatherApi.localeKey);
    expect(error).toEqual(ERRORS.weatherApi.locale);
    expect(errorKey).toEqual(ERRORS.weatherApi.localeKey);
  });

  it('Should return empty object if key does not exist', () => {
    const { error, errorKey } = buildError('gibberish');
    expect(error).toEqual('');
    expect(errorKey).toEqual('gibberish');
  });
});
