# React-Flux-Gulp Starter

We don't always choose React/Flux/Gulp, but when we do, we clone this.

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
