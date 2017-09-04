const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const less = require('gulp-less');
const rename = require('gulp-rename');
const path = require('path');

gulp.task('default', ['css-dev']);

gulp.task('css-dev', function() {
    return gulp.src('./src/less/import.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(rename('style.css'))
        .pipe(gulp.dest('./src/styles/'));
});


