var gulp = require('gulp');
var gulpIf = require('gulp-if');
var sprity = require('sprity');
var imagemin = require('gulp-imagemin');
var minifyCss = require('gulp-minify-css');

gulp.task('sprite', ['sprity', 'minifyspritesheet']);

// the "split" option will generate a separate file for each folder
// but they will be named after the folders,
// so some rework will need to be done to import them
// instead of the "spritesmith#" files
gulp.task('sprity', function() {
    return sprity.src({
        src: './common/img/sprites/spritesmith/**/*.png'
        , out: './common/dist/sprites'
        , style: 'sprity.css'
        , split: true
        , name: 'sprity'
        , margin: 0
    })
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('./common/dist/sprites/'));
});

gulp.task('minifyspritesheet', ['sprity'], function() {
    return gulp.src('./common/dist/sprites/*.css')
        .pipe(minifyCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./common/dist/sprites/'));
});