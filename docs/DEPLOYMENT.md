# Deployment

Under normal circumstances, HAUS leverages continuous integration to build and deploy our applications. If you don't want to bother with that, you can also deploy directly to a remote server environment, i.e. Heroku.

## Heroku Example

Assuming you've already created a Heroku application, substitute all occurences of `{HEROKU_APP_NAME}` with your actual Heroku app name.

First, if you haven't already, install the [Heroku Toolbelt](https://toolbelt.heroku.com/) and log in to Heroku:

```sh
$ heroku login
```

By default, Heroku does not install packages specified under `devDependencies` in `package.json`, but it needs those to build your application. Tell Heroku to install dev dependencies by setting the config variable `NPM_CONFIG_PRODUCTION` to `false`:

```sh
$ heroku config:set NPM_CONFIG_PRODUCTION=false --app {HEROKU_APP_NAME}
```

Next, add your Heroku repo as a remote:

```sh
$ heroku git:remote --app {HEROKU_APP_NAME}
```

Finally, push your code to Heroku:

```
$ git push heroku master
```
