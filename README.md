# React-Flux-Gulp Starter

We don't always choose React/Flux/Gulp, but when we do, we clone this.

## Getting Started

#### 1. Install gulp globally:

```sh
$ npm install --global gulp
```

#### 2. Install project dependencies:

```sh
$ npm install
```

#### 3. Run gulp

Start a local dev environment:

```sh
$ gulp
```

Generate a production build:

```sh
$ gulp production
```

#### 4. Deploy to Heroku

#### 4.1. Setup

You only need to do this once.

We assume that you have an app set up at Heroku. Below, please substitute all occurences of `###HEROKU_APP_NAME###` with your actual Heroku app name.

First, install the [Heroku Toolbelt](https://toolbelt.heroku.com/) and log in to Heroku:

```sh
$ heroku login
```

By default, Heroku does not install modules specified in you package.json's `devDependencies` section, but it needs those to build your site. You tell Heroku to install dev dependencies by setting the config variable `NPM_CONFIG_PRODUCTION` to `false`:

```sh
$ heroku config:set NPM_CONFIG_PRODUCTION=false --app ###HEROKU_APP_NAME###
```

Finally, add your Heroku app's repo as a remote. Run this in the project's root directory:

```sh
$ heroku git:remote -a ###HEROKU_APP_NAME###
```

##### 4.2. Deploy

Just push it. That is all.

```sh
$ git push heroku master
```
