# Weather APP

Project was built with React for the UI and NodeJS with Express for the API.
API requires `Node 18`.
## Running

### Docker

1. Install [Docker](https://docs.docker.com/engine/install/)
2. Run `docker-compose up`
3. UI is available in port 3001, API is available in port 3000

TODO: Write me

### Locally

1. Install [nvm](https://github.com/nvm-sh/nvm)
2. Install Node 18 (`nvm install 18; nvm use 18`)
3. Optionally, install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
4. Go into the api folder
5. Run `yarn install` or `npm install`
6. Run `yarn start` or `npm start`
7. Go into the ui folder
8. Run `yarn install` or `npm install`
9. Run `yarn start` or `npm start`

#### Troubleshooting

If the `install` step failed, make sure you are using `Node 18` (`node -v`)

## API

This is the service that wraps the Weather API.

* It allows specifying units to use
  * Default is 'standard'
  * Units can be standard, metric or imperial

It also uses another API to obtain lat/lon from ZIP codes.

* Since ZIP codes are not worldwide unique, locale is passed when needed
* Locale can be provided by the user

It is assuming the first datum returned from the Weather API represents
"today's" weather

The service requires Node 18 due to `fetch` api being used.

### Validations

* If Latitude or Longitude are provided, the other is required
  * Latitude and longitude are checked to _look_ like floats, due to JS's `parseFloat`
    * This means that `1234abcd` parses to 1234
* If ZIP code is provided, locale is considered required
  * For both we only check that they are non-empty strings

### Testing

We are using `jest` to test.
To run the tests:

1. `yarn install` or `npm install`
2. `yarn test`

#### Troubleshooting

If the `install` step failed, make sure you are using `Node 18`

### Tools

* Swagger (documentation)
* Express
* Jest (testing)

## UI

This is the UI to display weather data.

* It is an SPA so while each "tab" is a separate page, there is no actual navigation
  * This is internally handled by React's router
* It allows specifying units to use
  * Units can be standard, metric or imperial
  * Default is 'standard'
* Uses the browser's location data
  * If it is unavailable it will default to San Francisco, US
* Uses the browser's locale data
  * If it is unavailable it will default to 'US'

I18N was added since the beginning since:
1. It helps avoid magic strings
2. Makes testing a lot easier
3. Is simple to add early, but harder to add late

### Testing

We are using `jest` to test.
To run the tests:

1. `yarn install` or `npm install`
2. `yarn test`

### Tools

* React
* react-i18n (internationalization)
* Bulma (CSS framework)
* Jest (testing)
