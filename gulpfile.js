const { src, dest, parallel, series, watch} = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const removeHtmlComments = require('gulp-remove-html-comments');
const sourcemaps = require('gulp-sourcemaps');
const csso = require('gulp-csso');
const del = require('del')


function browsersync() {
    browserSync.init({
        server: { baseDir: 'dist/' },
        notify: true,
        online: true
    })
}

function html() {
    return src('src/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(removeHtmlComments())
    .pipe(dest('dist/'))
}

function styles() {
    return src('src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(concat('styles.min.css'))
    .pipe(dest('./dist/'))
}


function scripts() {
    return src([
        './src/scripts/script.js',
        './src/scripts/modules/*.js',
        './src/scripts/gameStarter.js'    
    ])
    .pipe(babel({
        presets: ['@babel/env', {modules: false}]
    }))
    .pipe(concat('app.min.js'))
    
    // .pipe(uglify())
    .pipe(dest('dist/'))
}

function composeScripts() {
    return src('src/scripts/*.js')
    .pipe(dest('./dist/js/'))
}

function clear() {
    return del('dist/')
}

function startwatch() {
    watch(['src/scripts/*.js'], '!app/**/*.min.js', scripts)
    watch('src/styles/*.scss', styles)
}


module.exports.build = series(clear, html, styles, scripts);