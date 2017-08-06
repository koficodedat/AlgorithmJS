const gulp = require('gulp');
const gulpmocha = require('gulp-mocha');

gulp.task('test', () => {

    return gulp.src(['test/*-spec.js','test/*/*-spec.js'], { read: false })
        .pipe(gulpmocha())
        .once('error', () => {
            process.exit(1);
        })
        .once('end', () => {
            process.exit();
        });

});

gulp.task('default',[ 'test' ]);