import gulp from 'gulp';
import gcssmq from 'gulp-group-css-media-queries';
import gulpSass from 'gulp-sass';
import * as sass from 'sass'
import concat from 'gulp-concat';
import browserSyncCreator from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import uglify from 'gulp-uglify-es';
import * as del from 'del';
import htmlmin from 'gulp-htmlmin';
import clean from 'gulp-clean';

// Assign the imported browserSync to a variable
const browserSync = browserSyncCreator.create();

// Initialize gulp-sass with the Sass implementation
const scss = gulpSass(sass);

// Destructure gulp methods
const {src, dest, watch, parallel, series} = gulp;

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    });
}

function html() {
    return src('src/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))  // Minify HTML
        .pipe(dest('dist'));
}

function scripts() {
    return src('src/scripts/**/*.js')
        .pipe(uglify.default())
        .pipe(dest('dist/scripts'))
        .pipe(browserSync.stream());
}

function images() {
    return src('src/img/**/*', {encoding: false})
        .pipe(imagemin())
        .pipe(dest('dist/img'))
        .pipe(webp())
        .pipe(dest('dist/img'));
}

function styles() {
    return src('src/scss/**/*.scss')
        .pipe(scss())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            grid: true
        }))
        .pipe(gcssmq())
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(dest('dist/styles'))
        .pipe(browserSync.stream());
}

async function copyAssets() {
    return src(['src/fonts/**/*', 'src/lib/**/*'], {base: 'src', encoding: false})
        .pipe(dest('dist'));
}

async function cleanDist() {
    return gulp
        .src('dist/*', {read: false})
        .pipe(clean());
}

function watching() {
    watch(['src/scss/**/*.scss'], styles);
    watch(['src/scripts/**/*.js'], scripts);
    watch(['src/*.html']).on('change', browserSync.reload);
}

export {styles, scripts, watching, browsersync, images, html, copyAssets};

const build = series(copyAssets, parallel(styles, scripts, images, html));

export {build};