// Intl polyfill
var Intl = window.Intl = require('intl/Intl');

// Intl locales
Intl.__addLocaleData(require('intl/locale-data/json/en.json'));
Intl.__addLocaleData(require('intl/locale-data/json/de.json'));
Intl.__addLocaleData(require('intl/locale-data/json/pt.json'));

// The rest of the app
require('./client');
