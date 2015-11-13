var gulp = require('gulp-help')(require('gulp'));
var spawn = require('child_process').spawn;
var config = require('../config').heroku;
var flags = require('minimist')(process.argv.slice(2));
var isProd = flags.production || flags.prod || false;
var isStaging = flags.staging || flags.stage || false;
var isDev = flags.development || flags.dev || false;
var Q = require('q');

function addRemote(env) {
    var deferred = Q.defer(),
        command;

    if (config[env] === undefined ||
        (config[env].remoteName == undefined || config[env].remoteName.length == 0) ||
        (config[env].remoteUrl == undefined || config[env].remoteUrl.length == 0)) {
        console.info(env + ' environment misconfigured. Moving on...');

        setTimeout(deferred.resolve, 0);
        return deferred.promise;
    } else {
        console.log('Adding ' + env + ' remote');
    }

    var remote = spawn('git', ['remote', 'add', config[env].remoteName, config[env].remoteUrl]);
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
            var command = '$ git remote add ' + config[env].remoteName + ' ' + config[env].remoteUrl;
            deferred.reject('Git returned an error. Try running manually the following command: \n' + command);
        }
    });

    return deferred.promise;
}

gulp.task('remotes', 'Adds heroku as remotes to git', function(callback) {
    function curry(func) {
        var args = Array.prototype.slice.call(arguments, 1);

        return function() {
            return func.apply(func, args);
        };
    }

    if (isDev) {
        addRemote('development')
            .done(callback);
    } else if (isStaging) {
        addRemote('staging')
            .done(callback);
    } else if (isProd) {
        addRemote('production')
            .done(callback);
    } else {
        addRemote('development')
            .then(curry(addRemote, 'staging'))
            .then(curry(addRemote, 'production'))
            .done(callback);
    }
});
