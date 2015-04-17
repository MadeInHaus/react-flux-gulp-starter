# Isomorphic React-Flux-Gulp Boilerplate

We don't always choose isomorphic React/Flux/Gulp, but when we do, we clone this.

- [react](https://facebook.github.io/react/) 0.13
- [react-router](https://github.com/rackt/react-router) 0.13
- [fluxible](http://fluxible.io/) 0.4
- [lodash](https://lodash.com/) 3.6
- [express](http://expressjs.com/) 4.12

#### Build tools

- [gulp](http://gulpjs.com/)
- [sass](http://sass-lang.com/)
- [browserify](http://browserify.org/)
- [browser-sync](http://www.browsersync.io/)
- etc, see [package.json](https://raw.githubusercontent.com/MadeInHaus/react-flux-gulp-starter/master/package.json)

## Getting Started

#### 1. Install gulp globally:

```
$ npm install --global gulp
```

#### 2. Install project dependencies:

```
$ npm install
```

#### 3. Run gulp

Start a local dev environment:

```
$ gulp
```

Generate a production build:

```
$ gulp production
```

#### 4. Deploy to Heroku

##### 4.1. Setup

You only need to do this once.

We assume that you have an app set up at Heroku. Below, please substitute all occurences of `###HEROKU_APP_NAME###` with your actual Heroku app name.

First, install the [Heroku Toolbelt](https://toolbelt.heroku.com/) and log in to Heroku:

```
$ heroku login
```

By default, Heroku does not install modules specified in your package.json's `devDependencies` section, but it needs those to build your site. You tell Heroku to install dev dependencies by setting the config variable `NPM_CONFIG_PRODUCTION` to `false`:

```
$ heroku config:set NPM_CONFIG_PRODUCTION=false --app ###HEROKU_APP_NAME###
```

Finally, add your Heroku app's repo as a remote. Run this in the project's root directory:

```
$ heroku git:remote --app ###HEROKU_APP_NAME###
```

##### 4.2. Deploy

Just push it. That is all.

```
$ git push heroku master
```
