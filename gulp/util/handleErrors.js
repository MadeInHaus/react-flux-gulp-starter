var exec = require('child_process').exec;

module.exports = function(err) {

  var args = Array.prototype.slice.call(arguments);
    var exec = require('child_process').exec;


    console.log(err.message);

    exec(['eval $(notify-send "Compile Error" "', err.message , '")'].join(''),
      function (error, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        if (error !== null) {
          console.log(error);
        }
    });

    // Keep gulp from hanging on this task
  this.emit('end');
};
