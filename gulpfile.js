/* jshint -W117 */
"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
//var pugbeautify = require('gulp-pug-beautify');
var gcmq = require("gulp-group-css-media-queries");
var postcss = require("gulp-postcss");
var sourcemaps = require("gulp-sourcemaps");
var unprefix = require("postcss-unprefix");
var autoprefixer = require("autoprefixer"); // gulp-autoprefixer
var browserSync = require("browser-sync").create(); // live-reload browser
var rename = require("gulp-rename");
var del = require("del");
// const babel = require("gulp-babel");

var paths = {
    // compiling scss to css
    styles: {
        src: "_src/scss/**/*.scss",
        dest: "_dest/css/"
    },
    // compiling pug to html
    templates: {
        src: "_src/template/*.pug",
        dest: "_dest/",
        watch: "_src/template/**/*.pug"
    },
    // compiling scipts to es5
    scripts: {
        src: "_src/js/*.js",
        dest: "_dest/js/"
    },
    images: {
        src: "_src/images/*.{gif,png,jpg,svg}",
        dest: "_dest/images/"
    },
    res: {
        src: "_src/res/*.*",
        dest: "_dest/res/"
    },
    // this files won't be compiled
    raw: {
        src: "_src/raw/**/*.*",
        dest: "_dest/"
    }
};
var options = {
    sass: {
        errLogToConsole: true,
        sourceMap: "sass", // req 4 map
        sourceComments: "map",
        outputStyle: "expanded" // nested, expanded, compact, compressed
    },
    pug: {
        // pretty: true,
        pretty: "    ",
        basedir: __dirname
    },
    pugbeautify: {
        omit_empty_lines: true
    }
};
// var fonts = './_src/fonts/*.{ttf,woff,woff2,eot,svg}';

function clean() {
    return del(["_dest/*"]);
}

function styles() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass(options.sass).on("error", sass.logError))
        .pipe(gcmq())
        .pipe(postcss([unprefix(), autoprefixer(options.autoprefixer)]))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.styles.dest))

	    .pipe(browserSync.stream())
}

function templates() {
    return gulp
        .src(paths.templates.src)
        .pipe(pug(options.pug))
        .pipe(gulp.dest(paths.templates.dest))

        .pipe(browserSync.stream());
}

function scripts() {
    return gulp
        .src(paths.scripts.src)
        .pipe(sourcemaps.init())
        // .pipe(babel({ presets: ["@babel/env"] }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(paths.scripts.dest))

        .pipe(browserSync.stream());
}

function images() {
    return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));
}

function res() {
    return gulp.src(paths.res.src).pipe(gulp.dest(paths.res.dest));
}

function raw() {
    return gulp.src(paths.raw.src).pipe(gulp.dest(paths.raw.dest));
}

function watch() {
    browserSync.init({
        server: paths.raw.dest
    });
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.watch, templates);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.res.src, res);
    gulp.watch(paths.raw.src, raw);
}

function sync() {
    browserSync.init({
        server: {
            baseDir: "./_dest/"
        }
    });
}

exports.clean = clean;
exports.styles = styles;
exports.templates = templates;
exports.scripts = scripts;
exports.images = images;
exports.watch = watch;
exports.sync = sync;

var build = gulp.series(
    clean,
    gulp.parallel(templates, styles, scripts, images, res, raw)
);

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
// });

gulp.task("build", build);

// var serve = gulp.series(build, gulp.parallel(watch, sync));
// gulp.task("serve", serve);

var dev = gulp.series(build, watch);
gulp.task("dev", dev);
