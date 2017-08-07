"use strict";

const config        = require('./gulp/config');

let gulp            = require('gulp');
let plugins         = require('gulp-load-plugins')(config.plugins);
let bsync           = require('browser-sync').create();
let webpack         = require('webpack');



//Watchers
gulp.task('watch', ['bsync'], () => {
    gulp.watch(config.watch.less, ['less']);
    // gulp.watch(config.watch.icons, ['icons']);
});



gulp.task('bsync', [/*'icons',*/ 'less'], () => {
    bsync.init(
        {
            proxy: 'http://localhost:9000/',
            port:9001
        });
});



/*HTML tasks*/
gulp.task('html:watch', () => {
    bsync.reload();
});



/*Less tasks*/
gulp.task('less', ['icons'], () =>
    gulp.src(config.less.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(gulp.dest(config.less.dest))
        .pipe(bsync.stream())
);



//JS tasks
// gulp.task('js', ['bsync'], () =>
//     gulp.src(config.js.src)
//         .pipe(plugins.plumber({
//             errorHandler: onPlumberError
//         }))
//         .pipe(webpackStream(webpackConfig, webpack))
//         .pipe(gulp.dest(config.js.dest))
//         .pipe(bsync.stream())
// );
//
// gulp.task('js:prod', () =>
//     gulp.src(config.js.src)
//         .pipe(plugins.plumber({
//             errorHandler: onPlumberError
//         }))
//         .pipe(webpackStream(webpackConfig, webpack))
//         .pipe(gulp.dest(config.js.dest))
//         .pipe(bsync.stream())
// );




//Img tasks
gulp.task('icons', () =>
    gulp.src(config.icons.src)
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.uri({
            template: {
                file: config.icons.template
            }
        }))
        .pipe(plugins.concat(config.icons.concat))
        .pipe(gulp.dest(config.icons.dest))
);



//Copy ng resources
gulp.task('copyProd', ['less'], () => {
    return gulp.src(config.copyProd.src, { base: './src' })
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(gulp.dest(config.copyProd.dest));
});




//Clean
gulp.task('clean', () => {
    return gulp.src(config.clean.src, {read: false})
        .pipe(plugins.plumber({
            errorHandler: onPlumberError
        }))
        .pipe(plugins.clean());
});



//General tasks
gulp.task('default', ['watch']);
gulp.task('prod', ['copyProd']);



/*HELPERS*/
process.on('uncaughtException', (err) => {
    console.error(err.message, err.stack, err.errors);
    process.exit(255);
});

gulp.on('err', (gulpErr) => {
    if (gulpErr.err) {
        console.error("Gulp error details", [gulpErr.err.message, gulpErr.err.stack, gulpErr.err.errors].filter(Boolean));
    }
});

function onPlumberError(error) {
    console.log(error);
    this.emit('end');
}