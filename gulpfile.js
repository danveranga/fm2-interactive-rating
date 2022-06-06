const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postCSS = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const terser = require('gulp-terser');
const rename = require('gulp-rename');

// js task
function minifyJs() {
    return src('lib/index.js', { sourcemaps: true })
    .pipe(terser())
    .pipe(rename('main.js'))
    .pipe(dest('dist', { sourcemaps: "." }));
}

// sass-css-postcss task
function stylesTask() {
    return src('assets/styles/scss/main.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postCSS([cssnano()]))
    .pipe(dest('assets/styles/css', { sourcemaps: '.' }));
}

// autoprefixer task
function fixMe() {
    return src('assets/styles/css/main.css')
    .pipe(postCSS([autoprefixer({ cascade: false })]))
    .pipe(dest('dist'));
}

// watch task
function watchChanges() {
    watch('assets/styles/scss/*.scss', stylesTask);
    watch('assets/styles/css/*.css', fixMe);
    watch('lib/*.js', minifyJs);
}

// default gulp task
exports.default = series(
    minifyJs,
    stylesTask,
    fixMe,
    watchChanges
);
