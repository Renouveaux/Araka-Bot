'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var rename =  require('gulp-rename');
var concat = require('gulp-concat');
var less = require('gulp-less');
var cssjoin = require('gulp-cssjoin');
var sass = require('gulp-sass');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync', 'watch'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init({
		proxy: "http://localhost:1337",
		files: ["web/assets/**/*.*"],
        open: false,
        ghostMode: false
	});
});

gulp.task('nodemon', function(cb){
	var started = false;

	return nodemon({
		script : 'index.js',
		ignore : ['web']
	}).on('start', function() {
		if(!started){
			cb();
			started = true;
		}
	})
});

/*
	This part take the app.js file and run the browserify to put it in app.min.js file
	*/
	gulp.task('browserify', function() {
		gulp.src('web/app/app.module.js')
		.pipe(browserify({
			insertGlobals: true,
			debug: true
		}))
		.on('error', onError)
		.pipe(rename('app.js'))
		.pipe(gulp.dest('web/assets/js'))
	});

	function onError(err){
		console.log(err);
		this.emit('end');
	}

/*
	Create the css file from all present in 'assests/css' folder
	*/
	gulp.task('concat-css', function () {
		gulp.src('web/libs/css/*.css')
		.pipe(concat('style.css'))
		.pipe(gulp.dest('web/assets/css'));
	});

/*
	Create css from less file
	*/
	gulp.task('less', function () {
		gulp.src('web/libs/less/main.less')
		//.pipe(cssjoin())
		.pipe(less())
		.pipe(concat('less.css'))
		.pipe(gulp.dest('web/assets/css'));
	});

	gulp.task('sass', function () {
		return gulp.src('web/libs/sass/main.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('sass.css'))
		.pipe(gulp.dest('web/assets/css'));
	});

/*
	Copy all image from assets to dist directory with same structure
	*/
	gulp.task('copy-img', function(){
		gulp.src('web/libs/img/**')
		.pipe(gulp.dest('web/assets/img'))
	})

/*
	Copy the fonts file from asset to put it in dist directory
	*/
	gulp.task('copy-fonts', function(){
		gulp.src('web/libs/fonts/**')
		.pipe(gulp.dest('web/assets/fonts'))
	})

	gulp.task('watch', function() {
		gulp.watch('web/app/**/*.js',['browserify']);
		gulp.watch('web/libs/**/*.js',['browserify']);
		gulp.watch('web/libs/css/*.css', ['concat-css']);
		//gulp.watch('web/assets/less/**/*.less', ['less']);
		gulp.watch('web/libs/less/**/*.less', ['less']);
		gulp.watch('web/libs/sass/*.scss', ['sass']);
		gulp.watch('web/libs/img/**/*', ['copy-img']);
		gulp.watch('web/libs/fonts/**/*', ['copy-fonts']);
	});

	gulp.task('dist', ['browserify', 'concat-css', 'less', 'sass', 'copy-img', 'copy-fonts'],function(){})
