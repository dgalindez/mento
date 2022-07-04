# Weather APP
Project was built with React for the UI and NodeJS with Express for the API.
API requires `Node 18`.

## Running

### Docker

TODO: WRITE ME

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

* It allows specifying units to use, the default is 'standard'
* Units can be standard, metric or imperial

It also uses another API to obtain lat/lon from ZIP codes.

* Since ZIP codes are not worldwide unique, locale is passed when needed
* Locale can be provided by the user

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
* JSDoc (function documentation)

## UI

### TODO

* Write failing tests
* Context to use hooks (locale/geolocation)
* Data section for main page
* Sections for Details Page (Today in depth, 8 day)
* Connect to API
* Styling
* Snapshot tests

### Document

* Commands to test
* Commands to start
* Why use i18n from the start
* Folder structure/hierarchy
* ENV needed (API URL)
* Defaults:
  * If geolocation is blocked/unavailable SF is used as the default
  * Locale is defaulted to user's locale

### Tools

* React
* react-i18n (internationalization)
* Bulma (CSS framework)
* Jest (testing)
* JSDoc (function documentation)
