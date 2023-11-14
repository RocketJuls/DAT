
const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2')
const svgSprite = require('gulp-svg-sprite');
const include = require('gulp-include');
 function pages(){
  return src('app/pages/*.html')
  .pipe(include({
    includePaths: 'app/components'
  }))
  .pipe(dest('app'))
  .pipe(browserSync.stream())
 }
function fonts(){
  return src('app/fonts/src/*.*')
  .pipe(fonter({
    formats:['woff','ttf']
  }))
  .pipe(src('app/fonts/*.ttf'))
  .pipe(ttf2woff2())
  .pipe(dest('app/fonts'))
}
function images() {
  return src(['app/images/src/*.*', '!app/images/src*.svg'])
    .pipe(newer('app/images'))
    .pipe(avif({ quality: 50 }))

    .pipe(src('app/images/src/*.*'))
    .pipe(newer('app/images'))
    .pipe(webp())

    .pipe(src('app/images/src/*.*'))
    .pipe(newer('app/images'))
    .pipe(imagemin())

    .pipe(dest('app/images'))
}
function sprite() {
  return src('app/images/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
          example: true
        }
      }
    }))
    .pipe(dest('app/images'))
}
function scripts() {
  return src([
    'node_modules/swiper/swiper-bundle.js',
    'app/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify(''))
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('app/scss/style.scss')
    .pipe(autoprefixer({ overrideBrowserlist: ['last 10 version'] }))
    .pipe(concat('style.min.css'))
    .pipe(scss({ outputStyle: 'compressed' }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}
function watching() {
  watch(['app/scss/style.scss'], styles)
  watch(['app/images/src'], images)
  watch(['app/js/main.js'], scripts)
  watch(['app/components/*','app/pages/*'],pages)
  watch(['app/*.html']).on('change', browserSync.reload)

}
function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
}
function cleanDist() {
  return src('dist')
    .pipe(clean())
}
function building() {
  return src([
    'app/css/style.min.css',
    'app/images/*.*',
    '!app/images/*.svg',
    'app/images/sprite.svg',
    'app/fonts/*.*',
    'app/js/main.min.js',
    'app/*.html'
  ], { base: 'app' })
    .pipe(dest('dist'))
}
exports.styles = styles;
exports.images = images;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;
exports.sprite = sprite;
exports.fonts = fonts;
exports.building = building;
exports.pages = pages;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, scripts, images, browsersync,pages, watching);
