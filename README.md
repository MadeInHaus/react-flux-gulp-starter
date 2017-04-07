# Isomorphic React-Flux-Gulp Boilerplate

We don't always choose isomorphic React/Flux/Gulp, but when we do, we clone this.

- [react](https://facebook.github.io/react/)
- [react-router](https://github.com/rackt/react-router)
- [fluxible](http://fluxible.io/)
- [express](http://expressjs.com/)

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
2. Install and/or update [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
3. Install [Kitematic](https://kitematic.com)
4. Install [docker-osx-dev](https://github.com/brikis98/docker-osx-dev#install)
5. Run `./dev.sh`
6. To exit from gulp type `ctrl-c` + enter
7. To exit the docker container type `ctrl-d` + enter

The project should now be viewable at [http://default:3000](http://default:3000). You can adjust default Browsersync settings at [http://default:3002](http://default:3002).

Of course, if you don't want to run Docker, you can also run it locally.

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

## Environment Variables

All environment variables are defined, maintained, and encryped via [git-secret](http://git-secret.io). Because they are encrypted, sensitive information (e.g. aws keys, database uris, etc) can be defined and commmitted to the repository. It's all centralized in one place.

To get up and running, follow these steps:

1. Install git-secret: `brew install git-secret`
2. If you haven't already, [download GPG Suite](https://gpgtools.org/).
3. Create a GPG key and upload it to the key server. This can be done via the GPG Keychain app.
4. Assuming you've been granted access by your project's dev lead, you can now run `git secret reveal` to decrypt all added `.env.*` files specified for the project.
5. After making changes to an `.env.*` file, you can run `git secret hide` to re-encrypt and save your changes. These changes are now safe to push to the repository.

By convention, HAUS' continuous integration server will match git branch name to the appropriate remote environment. For example, when pushing to a git branch named `staging`, our CI server will respect all environment variables set inside the `.env.staging` file. So the convention is `.env.{BRANCH_NAME}`.

Refer to [git-secret.io](http://git-secret.io) for more detailed instructions and usage information.


## Troubleshooting & Gotchas

### Docker Issues

![alt meltdown](https://media.giphy.com/media/ReImZejkBnqYU/giphy.gif)

#### Docker keeps telling me `ERROR: mkdir [...] no space left on device`

Run the cleanup script:

```sh
./_scripts/docker-cleanup.sh
```

#### Docker won't run, and it's affecting my self-esteem.

This is typically related to a dependency (or sub-dependency) conflict during `npm install`. Sometimes shutting down your currently running `default` vm and re-running `./dev.sh` will help. If that doesn't work, you can get the knife out :knife::

```sh
rm -rf .docker/.npm_revision && rm -rf .docker/node_modules.tar.gz
```

Then re-run `./dev.sh`.
