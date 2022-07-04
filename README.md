# TODO

* Dockerize for ease of use

## BE

### TODO

* Write failing tests
* Params validation
* API request to Google Maps
* API request to Weather API
* CORS
* Decide on format for response object

### Document

* Commands to generate documentation
* Commands to test
* Commands to start
* ENV needed (API keys)
* Format for successful response
* Failed responses
* Assumptions:
  * ZIPs are not worldwide unique so we need locale
  * Using Google Maps API to convert ZIP to lat/lon
* Validations:
  * If lat or lon is provided, the other is needed
  * If zip is provided, locale is needed
  * Units is one of standard, metric or imperial
* Defaults:
  * Units default to standard

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
