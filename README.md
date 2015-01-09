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

The following command will deploy to AWS S3:
```js
$ gulp deploy
```
AWS credentials should be defined in an gitignored JSON file called `aws.json`:

```
{
    "accessKeyId": "your-key-id",
    "secretAccessKey": "your-secret-access-key",
    "region": "your-s3-region",
    "dev": {
        "bucket": "your-dev-bucket-name"
    },
    "staging": {
        "bucket": "your-staging-bucket-name"
    },
    "prod": {
        "bucket": "your-production-bucket-name"
    }
}
```
