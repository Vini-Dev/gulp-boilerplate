/* eslint-disable node/no-unpublished-require */
const { src, dest, watch } = require('gulp');

const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
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
  src('./src/js/*.js')
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
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
  watch('./src/js/**/*.js', script);
  watch('./src/*.html').on('change', browserSync.reload);
};

exports.script = script;
exports.style = style;
exports.start = start;
