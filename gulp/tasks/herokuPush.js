var fs = require('fs');
var gulp = require('gulp-help')(require('gulp'));
var spawn = require('child_process').spawn;
var Slack = require('slack-node');
var configHeroku = require('../config').heroku;
var configSettings = require('../config').settings;

var flags = require('minimist')(process.argv.slice(2));
var isProd = flags.production || flags.prod || false;
var isStaging = flags.staging || flags.stage || false;
var isDev = flags.development || flags.dev || false;

gulp.task('heroku-push', 'Publish to heroku: gulp heroku-push [env]', function(callback) {
    var env;
    var uptodate = false;

    if (isDev) {
        env = 'development';
    } else if (isStaging) {
        env = 'staging';
    } else if (isProd) {
        env = 'production';
    } else {
        console.log('No environment set, defaulting to development.');
        env = 'development';
    }

    console.log('Pushing latest to Heroku ' + env + ' environment...\n\n');
    var push = spawn('git', ['push', configHeroku[env].remoteName, configHeroku[env].branch + ':master']);

    push.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    push.stderr.on('data', function(data) {
        var msg = data.toString();
        if (msg.indexOf('Everything up-to-date') > -1) {
            uptodate = true;
        }
        console.error(msg);
    });
    push.on('exit', function(code) {
        if (code == 0 && !uptodate) {
            if (configSettings && configSettings.src && fs.existsSync(configSettings.src)) {
                var settings;
                try {
                    settings = JSON.parse(fs.readFileSync(configSettings.src));
                } catch (e) {
                    console.error("Malformed settings.json");
                }
                if (settings && settings.slack) {
                    console.log('Sending message to ' + slackSettings.channel);

                    var slack = new Slack();
                    var slackSettings = settings.slack;
                    slack.setWebHook(slackSettings.webhook);
                    slack.webhook({
                        channel: slackSettings.channel,
                        username: slackSettings.username,
                        text: slackSettings.message + configHeroku[env].website
                    }, function(err, response) {
                        callback();
                    });

                    return;
                }
            }
        }
        callback();
    });
});
