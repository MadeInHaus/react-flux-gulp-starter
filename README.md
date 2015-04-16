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

Follow steps 4.1 to 4.4 below, then:

```sh
$ gulp heroku-push --[env]
```

Where `[env]` is one of these:

- `dev` or `development`
- `stage` or `staging`
- `prod` or `production`

##### 4.1. Edit config.js

In `./gulp/config.js`, in the `heroku` section, replace `HEROKU_APP_NAME_*` with your respective Heroku app names for development, staging and production. Change `branch` and `remoteName` if needed.

```js
heroku: {
    development: {
        branch: 'dev',
        remoteName: 'dev',
        remoteUrl: 'https://git.heroku.com/HEROKU_APP_NAME_DEV.git',
        website: 'http://HEROKU_APP_NAME_DEV.herokuapp.com'
    },
    staging: {
        branch: 'staging',
        remoteName: 'staging',
        remoteUrl: 'https://git.heroku.com/HEROKU_APP_NAME_STAGING.git',
        website: 'http://HEROKU_APP_NAME_STAGING.herokuapp.com'
    },
    production: {
        branch: 'master',
        remoteName: 'prod',
        remoteUrl: 'https://git.heroku.com/HEROKU_APP_NAME_PRODUCTION.git',
        website: 'http://HEROKU_APP_NAME_PRODUCTION.herokuapp.com'
    }
}
```

##### 4.2. Create settings.json for Slack integration (optional)

If you like Gulp to send a message to a Slack channel when a deploy was successful, create a `./settings.json` file that looks like this:

```js
{
    "slack": {
        "domain": "YOUR_SLACK_SUBDOMAIN",
        "username": "Joe Doe",
        "message": "New build up on: ",
        "channel": "#YOUR_SLACK_CHANNEL",
        "webhook": "https://hooks.slack.com/services/YOUR_SLACK_CHANNEL_WEBHOOK"
    }
}
```

##### 4.3. Tell Heroku to install devDependencies

By default, Heroku does not install modules specified in you package.json's `devDependencies` section, but it needs those to build your site.

Login to Heroku if you haven't yet:

```sh
$ heroku login
```

Then execute this for each Heroku app (dev, staging, production):

```sh
$ heroku config:set NPM_CONFIG_PRODUCTION=false --app HEROKU_APP_NAME
```

##### 4.4. Add Heroku remotes to your local git repository

If you haven't done it yet:

```sh
$ gulp remotes --[env]
```

##### 4.5. YOLO version of the above:

If you have a simple setup with only one master branch and one Heroku app:

`./gulp/config.js`:

```js
heroku: {
    development: {
        branch: 'master',
        remoteName: 'prod',
        remoteUrl: 'https://git.heroku.com/HEROKU_APP_NAME.git',
        website: 'http://HEROKU_APP_NAME.herokuapp.com'
    }
}
```

```sh
$ heroku login
$ heroku config:set NPM_CONFIG_PRODUCTION=false --app HEROKU_APP_NAME
$ gulp remotes --dev
$ gulp heroku-push
```
