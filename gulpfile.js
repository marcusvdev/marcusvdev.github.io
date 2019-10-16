const gulp = require('gulp');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');

function compile(){
	return(
	gulp.src('./src/sass/*.scss')
		.pipe(sass({outputStyle:'compressed'}))
		.pipe(sassGlob())
		.pipe(gcmq())
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 3 versions'],
			cascade: false
		}))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./dist/assets/css/'))
	) 
}
exports.compile = compile;

function imagesmin(){
	return(
	gulp.src('src/img/*')
        .pipe(imagemin([
		    imagemin.gifsicle({interlaced: true}),
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 5}),
		    imagemin.svgo({
		        plugins: [
		            {removeViewBox: true},
		            {cleanupIDs: false}
		        ]
		    })
		]))
        .pipe(gulp.dest('dist/assets/img'))
	)
}
exports.imagesmin = imagesmin;

function watchfiles(){
	gulp.watch('./src/sass/**', compile);
	gulp.watch('./src/img/*', imagesmin);
}
const watch = gulp.parallel(watchfiles)
exports.watch = watch;