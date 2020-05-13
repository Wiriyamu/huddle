const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browsersync = require('browser-sync').create();

function browserSync() {
  browsersync.init({
    server: {
      baseDir: "."
    }
  });
}
// BrowserSync Reload
function browserSyncReload() {
  browsersync.reload();
}

function watchFiles() {
  gulp.watch("sass/**/*.scss", scss);
  gulp.watch("*.html").on('change', browserSyncReload);
}

function scss() {
  return gulp.src('sass/main.scss')
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('css'))
    .pipe(browsersync.stream());
}

const build = gulp.series(gulp.parallel(scss));
const start = gulp.parallel(watchFiles, browserSync);

exports.scss = scss;
exports.start = start;
exports.build = build;
exports.default = start;
