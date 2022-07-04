jest.mock('../utils/cleanData');
jest.mock('../utils/locationApi');
jest.mock('../utils/weatherApi');

const request = require('supertest');

const app = require('../app');
const { UNITS, ERRORS } = require('../utils/constants');

const cleanData = require('../utils/cleanData');
const locationApi = require('../utils/locationApi');
const weatherApi = require('../utils/weatherApi');

cleanData.mockImplementation(() => ({ success: true }));

locationApi.mockImplementation(() => Promise.resolve({
  postalcodes: [
    {
      lat: 1,
      lng: 1,
    }
  ],
}));

weatherApi.mockImplementation(() => Promise.resolve({ data: 'data' }));

const path = '/weather';

describe(`GET ${path}`, () => {
  const validLocationQuery = { lat: 124.124, lon: 123.123 };
  const validZipQuery = { zip: 'A-98001', locale: 'US' };

  let server = null;

  beforeAll(() => {
    server = request(app);
  });

  it('should return data with valid lat and lon', async () => {
    const res = await server
      .get(path)
      .query(validLocationQuery);

    expect(res.statusCode).toEqual(200);

    expect(weatherApi).toHaveBeenCalledWith(
      validLocationQuery.lat,
      validLocationQuery.lon,
      UNITS.standard,
    );

    expect(cleanData).toHaveBeenCalledWith({ data: 'data' });
  });

  it('should return data with valid zip and locale', async () => {
    const res = await server
      .get(path)
      .query(validZipQuery);

    expect(res.statusCode).toEqual(200);

    expect(locationApi).toHaveBeenCalledWith(
      validZipQuery.zip,
      validZipQuery.locale,
    );

    expect(weatherApi).toHaveBeenCalledWith(
      1,
      1,
      UNITS.standard,
    );

    expect(cleanData).toHaveBeenCalledWith({ data: 'data' });
  });

  it('should return data with standard units', async () => {
    const res = await server
      .get(path)
      .query({
        ...validLocationQuery,
        units: UNITS.standard,
      });

    expect(res.statusCode).toEqual(200);

    expect(weatherApi).toHaveBeenCalledWith(
      validLocationQuery.lat,
      validLocationQuery.lon,
      UNITS.standard,
    );

    expect(cleanData).toHaveBeenCalledWith({ data: 'data' });
  });

  it('should return data with metric units', async () => {
    const res = await server
      .get(path)
      .query({
        ...validLocationQuery,
        units: UNITS.metric,
      });

    expect(res.statusCode).toEqual(200);

    expect(weatherApi).toHaveBeenCalledWith(
      validLocationQuery.lat,
      validLocationQuery.lon,
      UNITS.metric,
    );

    expect(cleanData).toHaveBeenCalledWith({ data: 'data' });
  });

  it('should return data with imperial units', async () => {
    const res = await server
      .get(path)
      .query({
        ...validLocationQuery,
        units: UNITS.imperial,
      });

    expect(res.statusCode).toEqual(200);

    expect(weatherApi).toHaveBeenCalledWith(
      validLocationQuery.lat,
      validLocationQuery.lon,
      UNITS.imperial,
    );

    expect(cleanData).toHaveBeenCalledWith({ data: 'data' });
  });

  it('should fail if no params are valid', async () => {
    const res = await server
      .get(path)
      .query({});

    expect(res.statusCode).toEqual(400);
    expect(res.body?.error).toEqual(ERRORS.weatherApi.noParams);
  });

  it('should fail if lat is valid and lon is not', async () => {
    const res = await server
      .get(path)
      .query({
        ...validLocationQuery,
        lat: null,
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body?.error).toEqual(ERRORS.weatherApi.noParams);
    expect(res.body?.errorKey).toEqual(ERRORS.weatherApi.noParamsKey);
  });

  it('should fail if lon is valid and lat is not', async () => {
    const res = await server
      .get(path)
      .query({
        ...validLocationQuery,
        lon: null,
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body?.error).toEqual(ERRORS.weatherApi.noParams);
    expect(res.body?.errorKey).toEqual(ERRORS.weatherApi.noParamsKey);
  });

  it('should fail if zip is valid and locale is not', async () => {
    const res = await server
      .get(path)
      .query({
        ...validZipQuery,
        locale: null,
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body?.error).toEqual(ERRORS.weatherApi.locale);
    expect(res.body?.errorKey).toEqual(ERRORS.weatherApi.localeKey);
  });

  it('should fail if locale is valid and zip is not', async () => {
    const res = await server
      .get(path)
      .query({
        ...validZipQuery,
        zip: null,
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body?.error).toEqual(ERRORS.weatherApi.noParams);
    expect(res.body?.errorKey).toEqual(ERRORS.weatherApi.noParamsKey);
  });

  it('should fail if units is not valid', async () => {
    const res = await server
      .get(path)
      .query({
        ...validLocationQuery,
        units: 'gibberish',
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body?.error).toEqual(ERRORS.weatherApi.units);
    expect(res.body?.errorKey).toEqual(ERRORS.weatherApi.unitsKey);
  });

  it('should fail if locationApi fails', async () => {
    locationApi.mockRejectedValue(() => Promise.reject())

    const res = await server
      .get(path)
      .query(validZipQuery);

    expect(res.statusCode).toEqual(500);
    expect(res.body?.error).toEqual(ERRORS.weatherApi.locationApi);
    expect(res.body?.errorKey).toEqual(ERRORS.weatherApi.locationApiKey);
  });

  it('should fail if locationApi returns empty', async () => {
    locationApi.mockReturnValueOnce(() => Promise.resolve({
      postalcodes: [],
    }));

    const res = await server
      .get(path)
      .query(validZipQuery);

    expect(res.statusCode).toEqual(500);
    expect(res.body?.error).toEqual(ERRORS.weatherApi.locationApi);
    expect(res.body?.errorKey).toEqual(ERRORS.weatherApi.locationApiKey);
  });

  it('should fail if weatherApi fails', async () => {
    weatherApi.mockRejectedValue(() => Promise.reject())

    const res = await server
      .get(path)
      .query(validLocationQuery);

    expect(res.statusCode).toEqual(500);
    expect(res.body?.error).toEqual(ERRORS.weatherApi.weatherApi);
    expect(res.body?.errorKey).toEqual(ERRORS.weatherApi.weatherApiKey);
  });
});
