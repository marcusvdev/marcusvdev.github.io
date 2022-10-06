import gulp from 'gulp';
import sassGlob from 'gulp-sass-glob';
import gcmq from 'gulp-group-css-media-queries';
import autoPrefixer from 'gulp-autoprefixer';
import GulpCleanCss from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import babel from 'gulp-babel';
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import htmlmin from 'gulp-htmlmin';
const sass = gulpSass(nodeSass);

gulp.task('compilesass', done => {
    gulp.src('./src/scss/*.scss')
        .pipe(sass({outputStyle:'compressed'}))
        .pipe(sassGlob())
        .pipe(gcmq())
        .pipe(autoPrefixer({
            overrideBrowserslist: ['last 3 versions'],
            cascade: false
        }))
        .pipe(GulpCleanCss())
        .pipe(gulp.dest('./dist/assets/css/'))
	done();
});

gulp.task('compilejs', done => {
	gulp.src('./src/js/*js')
		.pipe(babel())
		.pipe(gulp.dest('./dist/assets/js/'))
	done();
});

gulp.task('imagesmin', done => {
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/assets/images/'))
    done();
});

gulp.task('htmlmin', () => {
    return gulp.src('./src/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./'));
  });

gulp.task('default', gulp.parallel('compilesass', 'compilejs', 'imagesmin', 'htmlmin'), () => {
	gulp.watch('./src/scss/**', gulp.series('compilesass'))
	gulp.watch('./src/js/**', gulp.series('compilejs'))
	gulp.watch('./src/images/**', gulp.series('imagesmin'))
	gulp.watch('./src/*.html', gulp.series('htmlmin'))
});

export function watchfiles(){
    gulp.watch('./src/scss/**', gulp.series('compilesass'));
	gulp.watch('./src/js/**', gulp.series('compilejs'));
    gulp.watch('./src/images/**', gulp.series('imagesmin'))
    gulp.watch('./src/*.html', gulp.series('htmlmin'))
}

export default watchfiles();