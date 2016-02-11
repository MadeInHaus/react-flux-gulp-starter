# Isomorphic React-Flux-Gulp Boilerplate

We don't always choose isomorphic React/Flux/Gulp, but when we do, we clone this.

- [react](https://facebook.github.io/react/) 0.14
- [react-router](https://github.com/rackt/react-router) 2.0
- [fluxible](http://fluxible.io/) 1.0
- [express](http://expressjs.com/) 4.13

#### Build tools

- [gulp](http://gulpjs.com/)
- [sass](http://sass-lang.com/)
- [babel](https://babeljs.io/)
- [browserify](http://browserify.org/)
- [browser-sync](http://www.browsersync.io/)
- etc, see [package.json](https://raw.githubusercontent.com/MadeInHaus/react-flux-gulp-starter/master/package.json)

#### Demo

[https://react-flux-gulp-starter-test.herokuapp.com/](https://react-flux-gulp-starter-test.herokuapp.com/)

## Getting Started (The Docker Version 🐳)

1. Make sure [Homebrew](http://brew.sh/) is installed
2. Install and/or update [VirtualBox](https://www.virtualbox.org/wiki/Download)
3. Install [docker-osx-dev](https://github.com/brikis98/docker-osx-dev#install)

```
        curl -o /usr/local/bin/docker-osx-dev https://raw.githubusercontent.com/brikis98/docker-osx-dev/master/src/docker-osx-dev
        chmod +x /usr/local/bin/docker-osx-dev
        docker-osx-dev install
```

4. Run `./dev.sh`

The project should now be viewable at [http://dockerhost:3000](http://dockerhost:3000). You can adjust default Browsersync settings at [http://dockerhost:3002](http://dockerhost:3002).

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
