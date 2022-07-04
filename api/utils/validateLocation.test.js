const validateLocation = require('./validateLocation');

describe('validateLocation', () => {
  it('Should be valid with both being floats', () => {
    const { isValid, lat, lon } = validateLocation('0.124', '123.0');

    expect(isValid).toBeTruthy();
    expect(lat).toEqual(0.124);
    expect(lon).toEqual(123.0);
  });

  it('Should be valid with both starting as floats', () => {
    const { isValid, lat, lon } = validateLocation('0.124gibberish', '123.0gibberish');

    expect(isValid).toBeTruthy();
    expect(lat).toEqual(0.124);
    expect(lon).toEqual(123.0);
  });

  it('Should be valid with lat as number', () => {
    const { isValid, lat, lon } = validateLocation('124', '123.0');

    expect(isValid).toBeTruthy();
    expect(lat).toEqual(124);
    expect(lon).toEqual(123.0);
  });

  it('Should be valid with lon as number', () => {
    const { isValid, lat, lon } = validateLocation('0.124', '123');

    expect(isValid).toBeTruthy();
    expect(lat).toEqual(0.124);
    expect(lon).toEqual(123.0);
  });

  it('Should be invalid with lat empty', () => {
    const { isValid, lat, lon } = validateLocation('', '123.0');

    expect(isValid).toBeFalsy();
    expect(lat).toBeNaN();
    expect(lon).toEqual(123.0);
  });

  it('Should be invalid with lon empty', () => {
    const { isValid, lat, lon } = validateLocation('0.124', '');

    expect(isValid).toBeFalsy();
    expect(lat).toEqual(0.124);
    expect(lon).toBeNaN();
  });

  it('Should be invalid with both empty', () => {
    const { isValid, lat, lon } = validateLocation('', '');

    expect(isValid).toBeFalsy();
    expect(lat).toBeNaN();
    expect(lon).toBeNaN();
  });

  it('Should be invalid with non-number string for lat', () => {
    const { isValid, lat, lon } = validateLocation('gibberish', '123.0');

    expect(isValid).toBeFalsy();
    expect(lat).toBeNaN();
    expect(lon).toEqual(123.0);
  });

  it('Should be invalid with non-number string for lon', () => {
    const { isValid, lat, lon } = validateLocation('0.124', 'gibberish');

    expect(isValid).toBeFalsy();
    expect(lat).toEqual(0.124);
    expect(lon).toBeNaN();
  });

  it('Should be invalid with non-number string for both', () => {
    const { isValid, lat, lon } = validateLocation('gibberish', 'moarGibberish');

    expect(isValid).toBeFalsy();
    expect(lat).toBeNaN();
    expect(lon).toBeNaN();
  });
});
