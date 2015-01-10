var gulp = require('gulp');
var config = require('../config').settings;
var fs = require('fs');
var s3 = require('s3');
var Slack = require('node-slack');

var flags = require('minimist')(process.argv.slice(2));
var isProd = flags.production || flags.prod || false;
var isStaging = flags.staging || flags.stage || false;
var isDev = flags.development || flags.dev || false;

gulp.task('s3', ['production'], function() {

    // Keep sensitive credentials outside the repo
    var settings = JSON.parse(fs.readFileSync(config.src));
    var s = settings.slack;
    var aws = settings.aws;
    var s3Bucket;

    if (isProd) {
        s3Bucket = aws.bucket.prod;
    } else if (isStaging) {
        s3Bucket = aws.bucket.staging;
    } else if (isDev) {
        s3Bucket = aws.bucket.dev;
    } else {
        console.error('\nError! Please specify an `--[environment]` when running the "deploy" task\n');
        return;
    }

    var client = s3.createClient({
        maxAsyncS3: 20, // this is the default
        s3RetryCount: 3, // this is the default
        s3RetryDelay: 1000, // this is the default
        multipartUploadThreshold: 20971520, // this is the default (20 MB)
        multipartUploadSize: 15728640, // this is the default (15 MB)
        s3Options: aws
    });

    var params = {
        localDir: config.dest,
        deleteRemoved: true,
        s3Params: {
            Bucket: s3Bucket,
            ACL: 'public-read'
        }
    };

    console.log('\n\n*** Deploying to AWS S3 ***\n\n');

    var uploader = client.uploadDir(params);

    uploader.on('error', function(err) {
        console.error('unable to upload:', err.stack);
    });

    uploader.on('progress', function() {
        console.log('progress', uploader.progressMd5Amount,
            uploader.progressAmount, uploader.progressTotal);
    });

    uploader.on('end', function() {
        console.log('done uploading');
        var slack = new Slack(s.domain, s.token);

        slack.send({
            text: s.message + 'http://' + s3Bucket + '.s3-website-' + aws.region + '.amazonaws.com',
            channel: s.channel,
            username: s.username
        });

    });

});
