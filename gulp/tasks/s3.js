var gulp = require('gulp');
var config = require('../config').s3;
var fs = require('fs');
var s3 = require('s3');


gulp.task('s3', ['production'], function() {

    // TODO:
    // Require `--env` flag and swap out bucket accordingly

    // Keep AWS credentials outside the repo
    var awsCreds = JSON.parse(fs.readFileSync(config.awsCreds));

    var client = s3.createClient({
        maxAsyncS3: 20, // this is the default
        s3RetryCount: 3, // this is the default
        s3RetryDelay: 1000, // this is the default
        multipartUploadThreshold: 20971520, // this is the default (20 MB)
        multipartUploadSize: 15728640, // this is the default (15 MB)
        s3Options: awsCreds
    });

    var params = {
        localDir: config.src,
        deleteRemoved: true,
        s3Params: {
            Bucket: awsCreds.dev.bucket,
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
    });

});
