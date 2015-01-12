# Backbone-Marionette-Gulp Starter

We don't always choose Backbone/Marionette/Gulp, but when we do, we clone this. The starting point for our frontend applications at [HAUS](http://madeinhaus.com).

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
```js
$ gulp
```

Generate a production build:
```js
$ gulp production
```

#### 4. Deployment

The following command will deploy to [AWS S3](http://aws.amazon.com/s3/):
```js
$ gulp deploy --[env]
```

This boilerplate assumes you've created a `settings.json` file in the project root. _This file should be (git)ignored as it contains sensitive information, i.e. AWS keys, etc._ When deployment is finished, a [Slack](http://slack.com) hook will be triggered in a channel of your choice. If you haven't heard of Slack, close Skype immediately and [read about it](http://slack.com).

##### Environment options

- `--dev` or `--development`
- `--stage` or `--staging`
- `--prod` or `--production`

One of these arguments is required to successfully deploy files to S3, i.e `gulp deploy --staging`.

##### Sample `settings.json`:

```
{
    "slack": {
        "domain": "haus",
        "token": "YOUR_SLACK_TOKEN",
        "username": "Arnold Scavonegger",
        "message": "New build up on: ",
        "channel": "#dev-internal"
    },
    "aws": {
        "accessKeyId": "YOUR_AWS_KEY",
        "secretAccessKey": "YOUR_AWS_SECRET_KEY",
        "region": "us-east-1",
        "bucket": {
            "dev": "YOUR_DEV_BUCKET",
            "staging": "YOUR_STAGING_BUCKET",
            "prod": "YOUR_PROD_BUCKET"
        }
    }
}
```
