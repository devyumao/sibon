var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
// require: https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
var livereload = require('gulp-livereload');
var gutil = require('gulp-util');
var minifyCSS = require('gulp-minify-css');
var gulpFilter = require('gulp-filter');
var expect = require('gulp-expect-file');
var gulpsync = require('gulp-sync')(gulp);
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');

var LVR_PORT = 35729;

var isProduction = false;
var useSourceMaps = false;

var HIDDEN_FILES = '**/_*.*';
var IGNORED_FILES = '!' + HIDDEN_FILES;

// VENDOR CONFIG
var vendor = {
    // vendor scripts required to start the app
    base: {
        source: require('./vendor.base.json'),
        dest: 'asset/js',
        name: 'base.js'
    },
    // vendor scripts to make to app work. Usually via lazy loading
    app: {
        source: require('./vendor.json'),
        dest: 'vendor'
    }
};

// SOURCES CONFIG
var source = {
    scripts: {
        app: [
            'src/public/app.js',
            'src/public/config.js',
            'src/public/constant.js',
            'src/public/controller/*.js',
            'src/public/directive/*.js',
            'src/public/service/*.js',
            'src/business/**/*.js'
        ],
        watch: [
            'src/public/**/*.js',
            'src/business/**/*.js'
        ]
    },
    styles: {
        app: {
            main: [
                'src/public/style/app.less',
                '!src/public/style/themes/*.less'
            ],
            dir: 'src/public/style',
            watch: [
                'src/public/style/**/*.less',
                '!src/public/style/themes/*.less',
                'src/business/**/*.less'
            ]
        },
        themes: {
            main: ['src/public/style/themes/*.less', IGNORED_FILES],
            dir: 'src/public/style/themes',
            watch: ['src/public/style/themes/*.less']
        }
    },
    bootstrap: {
        main: 'src/public/style/bootstrap/bootstrap.less',
        dir: 'src/public/style/bootstrap',
        watch: ['src/public/style/bootstrap/*.less']
    },
    views: {
        files: [
            'src/public/view/**/*.html',
            'src/business/**/*.html'
        ],
        watch: [
            'src/public/view/**/*.html',
            'src/business/**/*.html',
            HIDDEN_FILES
        ]
    }
};

// BUILD TARGET CONFIG
var build = {
    scripts: {
        app: {
            main: 'app.js',
            dir: 'asset/js'
        }
    },
    styles: 'asset/css',
    views: 'asset/view'
};



//---------------
// TASKS
//---------------


// JS APP
gulp.task('scripts:app', function () {
    return gulp.src(source.scripts.app)
        .pipe(useSourceMaps ? sourcemaps.init() : gutil.noop())
        .pipe(concat(build.scripts.app.main))
        .pipe(ngAnnotate())
        .on('error', handleError)
        .pipe(isProduction ? uglify({
            preserveComments: 'some'
        }) : gutil.noop())
        .on('error', handleError)
        .pipe(useSourceMaps ? sourcemaps.write() : gutil.noop())
        .pipe(gulp.dest(build.scripts.app.dir));
});


// VENDOR BUILD
gulp.task('scripts:vendor', ['scripts:vendor:base', 'scripts:vendor:app']);

gulp.task('scripts:vendor:base', function () {
    return gulp.src(vendor.base.source)
        .pipe(expect(vendor.base.source))
        .pipe(uglify())
        .pipe(concat(vendor.base.name))
        .pipe(gulp.dest(vendor.base.dest));
});

gulp.task('scripts:vendor:app', function () {

    var jsFilter = gulpFilter('**/*.js');
    var cssFilter = gulpFilter('**/*.css');

    return gulp.src(vendor.app.source, {
            base: 'bower_components'
        })
        .pipe(expect(vendor.app.source))
        .pipe(jsFilter)
        .pipe(uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(minifyCSS())
        .pipe(cssFilter.restore())
        .pipe(gulp.dest(vendor.app.dest));

});

// APP LESS
gulp.task('styles:app', function () {
    return gulp.src(source.styles.app.main)
        .pipe(useSourceMaps ? sourcemaps.init() : gutil.noop())
        .pipe(less({
            paths: [source.styles.app.dir]
        }))
        .on('error', handleError)
        .pipe(isProduction ? minifyCSS() : gutil.noop())
        .pipe(useSourceMaps ? sourcemaps.write() : gutil.noop())
        .pipe(gulp.dest(build.styles));
});

// LESS THEMES
gulp.task('styles:themes', function () {
    return gulp.src(source.styles.themes.main)
        .pipe(less({
            paths: [source.styles.themes.dir]
        }))
        .on('error', handleError)
        .pipe(gulp.dest(build.styles));
});

// BOOSTRAP
gulp.task('bootstrap', function () {
    return gulp.src(source.bootstrap.main)
        .pipe(less({
            paths: [source.bootstrap.dir]
        }))
        .on('error', handleError)
        .pipe(gulp.dest(build.styles));
});

// VIEWS
gulp.task('views', function () {
    return gulp.src(source.views.files)
        .pipe(gulp.dest(build.views));
});


//---------------
// WATCH
//---------------

gulp.task('watch', function () {
    livereload.listen();

    gulp.watch(source.scripts.watch, ['scripts:app']);
    gulp.watch(source.styles.themes.watch, ['styles:themes']);
    gulp.watch(source.styles.app.watch, ['styles:app']);
    gulp.watch(source.bootstrap.watch, ['styles:app']);
    watch(source.views.watch, function () {
        gulp.start('views');
    });

    gulp.watch([

        '../asset/**'

    ]).on('change', function (event) {

        livereload.changed(event.path);

    });

});


//---------------
// DEFAULT TASK
//---------------

// build for production (minify)
gulp.task('build', ['prod', 'default']);
gulp.task('prod', function () {
    isProduction = true;
});

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function () {
    useSourceMaps = true;
});

// default (no minify)
gulp.task('default', gulpsync.sync([
    'scripts:vendor',
    'scripts:app',
    'start'
]), function () {
    gutil.log(gutil.colors.cyan('************'));
    gutil.log(gutil.colors.cyan('* All Done *'));
    gutil.log(gutil.colors.cyan('************'));
});

gulp.task('start', [
    'styles:app',
    'styles:themes',
    'watch'
]);

gulp.task('done', function () {
    console.log('All Done!');
});

// Error handler
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}
