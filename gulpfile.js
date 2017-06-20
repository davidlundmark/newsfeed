var gulp = require('gulp');
var watch = require('gulp-watch');

var source = './';
var project_destination = './';

var debug = false;

gulp.task('default', ['watch:sync-project', 'webpack:watch' ]);

var runSequence = require('run-sequence');

//sync files to VS project
gulp.task('watch:sync-project', function() {
    gulp.src(source, { base: source })
        .pipe(watch(source + 'src/', { base: source }))
        .pipe(gulp.dest(project_destination));
});

//trigger webpack --watch
var spawn = require('cross-spawn');

gulp.task('webpack:watch', (cb) => {
    var env = debug ? 'development' : 'production';

    process.env.NODE_ENV = env;
    
    const webpack_watch = spawn('webpack', ['--watch','--display-error-details']);

    webpack_watch.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    webpack_watch.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
    });

    webpack_watch.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});