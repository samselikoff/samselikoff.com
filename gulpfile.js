// var gulp = require('gulp');

// var proc = require('child_process'),
//     op = require('open'),
//     refresh = require('gulp-livereload')
//     // lr = require('tiny-lr')()
//     ;


// gulp.task('serve', function() {
//   proc.spawn('http-server', ['_site']);
//   lr.listen(35729);

//   op('http://0.0.0.0:8080');
//   // var spawn = proc.spawn('open', ['http://0.0.0.0:8080']);
//   // spawn.on('close', function() {
//   //   console.log('CLOSED');
//   // });
// });

// gulp.task('build', function(cb) {
//   // proc.spawn('jekyll', ['build'], {stdio: 'inherit'});
//   proc.exec('jekyll build', function(err, stdout, stderr) {
//     console.log(stdout);
//     cb(err);
//   });

// });

// gulp.task('jekyll', function(cb) {
//   proc.spawn('jekyll', ['serve', '-w'], {stdio: 'inherit'});
//   // proc.spawn('jekyll serve -w', function(err, stdout, stderr) {
//   //   console.log(stdout);
//   //   cb(err);
//   // });

// });

// // gulp.task('reload', ['build'], function() {
// //   console.log('[           HEY THERE               ]');
// //   // console.log(lr);
// //   lr.changed('/');
// // });

// gulp.task('watch', function() {
//   gulp.watch({glob: '/_site/**'}, function(files) {
//     console.log('Hasdf');
//   //   // return files.pipe(refresh(lr));
//   });
// });

// // gulp.task('default', ['build', 'serve', 'watch']);
// // gulp.task('default', ['jekyll', 'watch']);
// gulp.task('default', ['jekyll', 'watch']);

var gulp = require('gulp');
var refresh = require('gulp-livereload');
var watch = require('gulp-watch');
var lr = require('tiny-lr');
var server = lr();

gulp.task('jw', function(){
    var spawn = require('child_process').spawn,
        j     = spawn('jekyll', ['-w', 'serve']);

    j.stdout.on('data', function (data) {
        console.log('stdout: ' + data); // works fine
    });

    watch({glob: '_site'}, function(files) {
        // update files in batch mode
        console.log('======== HI!');
        return files.pipe(refresh(server));
    });
});