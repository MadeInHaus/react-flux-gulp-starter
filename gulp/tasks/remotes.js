const gulp = require('gulp-help')(require('gulp'));
const spawn = require('child_process').spawn;
const config = require('../config').heroku;
const flags = require('minimist')(process.argv.slice(2));
const isProd = flags.production || flags.prod || false;
const isStaging = flags.staging || flags.stage || false;
const isDev = flags.development || flags.dev || false;
const Q = require('q');

function addRemote(env) {
    let deferred = Q.defer(),
        command;

    if (
        config[env] === undefined ||
        (config[env].remoteName == undefined ||
            config[env].remoteName.length == 0) ||
        (config[env].remoteUrl == undefined ||
            config[env].remoteUrl.length == 0)
    ) {
        console.info(env + ' environment misconfigured. Moving on...');

        setTimeout(deferred.resolve, 0);
        return deferred.promise;
    }
    console.log('Adding ' + env + ' remote');

    const remote = spawn('git', [
        'remote',
        'add',
        config[env].remoteName,
        config[env].remoteUrl,
    ]);
    remote.stdout.on('data', function(data) {
        console.log(data.toString());
    });
    remote.stderr.on('data', function(data) {
        console.log(data.toString());
    });
    remote.on('exit', function(code) {
        if (code == 0) {
            deferred.resolve();
        } else {
            const command =
                '$ git remote add ' +
                config[env].remoteName +
                ' ' +
                config[env].remoteUrl;
            deferred.reject(
                'Git returned an error. Try running manually the following command: \n' +
                    command
            );
        }
    });

    return deferred.promise;
}

gulp.task('remotes', 'Adds heroku as remotes to git', function(callback) {
    function curry(func) {
        const args = Array.prototype.slice.call(arguments, 1);

        return function() {
            return func.apply(func, args);
        };
    }

    if (isDev) {
        addRemote('development').done(callback);
    } else if (isStaging) {
        addRemote('staging').done(callback);
    } else if (isProd) {
        addRemote('production').done(callback);
    } else {
        addRemote('development')
            .then(curry(addRemote, 'staging'))
            .then(curry(addRemote, 'production'))
            .done(callback);
    }
});
