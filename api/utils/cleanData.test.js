const cleanData = require('./cleanData');

describe('cleanData', () => {
  const city = {
    name: 'Name',
    country: 'Country',
  };

  const list = [
    {
      dt_txt: '1970-01-01 00:00:00',
      main: {
        temp: 100,
        temp_max: 110,
        temp_min: 96,
        feels_like: 102,
        humidity: 231.2,
      },
    },
    {
      dt_txt: '1970-01-01 12:00:00',
      main: {
        temp_max: 120,
        temp_min: 100,
      },
    },
    {
      dt_txt: '1970-01-02 00:00:00',
      main: {
        temp_max: 100,
        temp_min: 100,
      },
    },
    {
      dt_txt: '1970-01-02 12:00:00',
      main: {
        temp_max: 90,
        temp_min: 80,
      },
    },
  ];

  it('Return empty with nothing', () => {
    const result = cleanData();

    expect(result.city).toEqual('');
    expect(result.country).toEqual('');
    expect(result.current).toEqual({});
    expect(result.daily).toHaveLength(0);
  });

  it('Return empty with empty object', () => {
    const result = cleanData({});

    expect(result.city).toEqual('');
    expect(result.country).toEqual('');
    expect(result.current).toEqual({});
    expect(result.daily).toHaveLength(0);
  });

  it('Return city and country when present', () => {
    const result = cleanData({ city });

    expect(result.city).toEqual(city.name);
    expect(result.country).toEqual(city.country);
    expect(result.current).toEqual({});
    expect(result.daily).toHaveLength(0);
  });

  it('Return current and daily data when present', () => {
    const result = cleanData({
      city,
      list,
    });

    expect(result.city).toEqual(city.name);
    expect(result.country).toEqual(city.country);

    expect(result.current.feelsLike).toEqual(list[0].main.feels_like);
    expect(result.current.humidity).toEqual(list[0].main.humidity);
    expect(result.current.temperature).toEqual(list[0].main.temp);
    expect(result.current.temperature).toEqual(list[0].main.temp);
    expect(result.current.max).toEqual(list[1].main.temp_max);
    expect(result.current.min).toEqual(list[0].main.temp_min);

    expect(result.daily).toHaveLength(2);

    expect(result.daily[0].max).toEqual(list[1].main.temp_max);
    expect(result.daily[0].max).toEqual(result.current.max);
    expect(result.daily[0].min).toEqual(list[0].main.temp_min);
    expect(result.daily[0].min).toEqual(result.current.min);

    expect(result.daily[1].max).toEqual(list[2].main.temp_max);
    expect(result.daily[1].min).toEqual(list[3].main.temp_min);
  });
});
