const { src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const htmlmin = require('gulp-htmlmin');
const removeHtmlComments = require('gulp-remove-html-comments');
const csso = require('gulp-csso');
const del = require('del')

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

function composeScripts() {
    return src([
        './src/scripts/script.js',
        './src/scripts/modules/*.js',
        './src/scripts/gameStarter.js'    
    ])
    .pipe(concat('app.min.js'))
    .pipe(babel({
        presets: [
            [
                '@babel/env',
                {
                    modules: false
                }
        ]]
    }))
    
    
    .pipe(uglify())
    .pipe(dest('dist/'))
}

function clear() {
    return del('dist/')
}

module.exports.dev = series(clear, html, styles, composeScripts)