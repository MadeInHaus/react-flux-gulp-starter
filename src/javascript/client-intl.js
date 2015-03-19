if (typeof window.Intl === "undefined") {

    // Intl polyfill
    var _intl_ = window.Intl = require('intl/Intl');

    // Intl locales
    _intl_.__addLocaleData(require('intl/locale-data/json/en.json'));
    _intl_.__addLocaleData(require('intl/locale-data/json/de.json'));
    _intl_.__addLocaleData(require('intl/locale-data/json/pt.json'));

}
