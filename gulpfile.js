/* eslint-disable node/no-unpublished-require */
const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const style = () =>
  src('./src/scss/main.scss')
    .pipe(sourcemaps.init()) // initialize sourcemaps first
    .pipe(sass()) // compile SCSS to CSS
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./src/static/css'))
    .pipe(browserSync.stream());

const script = () =>
  src('./src/js/main.js')
    .pipe(
      babel({
        presets: [
          [
            '@babel/env',
            {
              modules: false,
            },
          ],
        ],
      })
    )
    .pipe(uglify())
    .pipe(dest('./src/static/js/'))
    .pipe(browserSync.stream());

const start = () => {
  browserSync.init({
    server: {
      baseDir: './src',
    },
  });
  watch('./src/scss/**/*.scss', style);
  watch('./src/js/main.js', script);
  watch('./src/*.html').on('change', browserSync.reload);
};

exports.script = script;
exports.style = style;
exports.start = start;
