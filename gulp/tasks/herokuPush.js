const fs = require('fs');
const gulp = require('gulp-help')(require('gulp'));
const spawn = require('child_process').spawn;
const Slack = require('slack-node');
const configHeroku = require('../config').heroku;
const configSettings = require('../config').settings;

const flags = require('minimist')(process.argv.slice(2));
const isProd = flags.production || flags.prod || false;
const isStaging = flags.staging || flags.stage || false;
const isDev = flags.development || flags.dev || false;

gulp.task('heroku-push', 'Publish to heroku: gulp heroku-push [env]', function(
    callback
) {
    let env;
    let uptodate = false;

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
    const push = spawn('git', [
        'push',
        configHeroku[env].remoteName,
        configHeroku[env].branch + ':master',
    ]);

    push.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    push.stderr.on('data', function(data) {
        const msg = data.toString();
        if (msg.indexOf('Everything up-to-date') > -1) {
            uptodate = true;
        }
        console.error(msg);
    });
    push.on('exit', function(code) {
        if (code == 0 && !uptodate) {
            if (
                configSettings &&
                configSettings.src &&
                fs.existsSync(configSettings.src)
            ) {
                let settings;
                try {
                    settings = JSON.parse(fs.readFileSync(configSettings.src));
                } catch (e) {
                    console.error('Malformed settings.json');
                }
                if (settings && settings.slack) {
                    console.log('Sending message to ' + slackSettings.channel);

                    const slack = new Slack();
                    var slackSettings = settings.slack;
                    slack.setWebHook(slackSettings.webhook);
                    slack.webhook(
                        {
                            channel: slackSettings.channel,
                            username: slackSettings.username,
                            text:
                                slackSettings.message +
                                configHeroku[env].website,
                        },
                        function(err, response) {
                            callback();
                        }
                    );

                    return;
                }
            }
        }
        callback();
    });
});
