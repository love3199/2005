let {src,dest,watch} = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    imagemin = require('gulp-imagemin');

function fnCopyIndex(){
    return src('./src/index.html').pipe(dest('./dist'));
}
function fnJS(){
    return src('./src/js/*.js').pipe(babel({presets: ['@babel/env']})).pipe(uglify()).pipe(rename({suffix : '.min'})).pipe(dest('./dist/js'));
}
function fnCSS(){
    return src('./src/sass/*.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix : '.min'})).pipe(dest('./dist/css'));
}
function fnImg(){
    return src('./src/img/*')
    .pipe(imagemin())
    .pipe(dest('./dist/img'));
}
function fnPage(){
    return src('./src/pages/*.html')
    .pipe(htmlmin())
    .pipe(dest('./dist/pages'));
}
function fnWatch(){
    watch('./src/pages/*.html',fnPage);
    watch('./src/sass/*.scss',fnCSS);
    watch('./src/js/*.js',fnJS);
    watch('./src/index.html',fnCopyIndex);
}
exports.copy = fnCopyIndex;
exports.js = fnJS;
exports.css = fnCSS;
exports.page = fnPage;
exports.img = fnImg;
exports.default = fnWatch;