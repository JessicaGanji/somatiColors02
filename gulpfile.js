var 
	gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	nodemon = require('gulp-nodemon'),
	browserSync = require('browser-sync')


////////////////////////////////////////// ///////////////////// minify all css files ///////////////////////////////////////////////////////////////
gulp.task('minify-css', function() {
    gulp.src('public-dev/css/*.css')
        .pipe(concat('application.min.css'))
        .pipe(uglifycss() )
        .pipe(gulp.dest('public/css'))
        // .pipe(browserSync.stream() )
})

/////////////////////////////////////////////////////////////// run nodemon ///////////////////////////////////////////////////////////////

gulp.task('nodemon', function(){
    nodemon({
        ext: "js html css",
        env: {'NODE_ENV': 'development'}
    })
})

////////////////////////////////////////////////////////// browser sync & nodemon //////////////////////////////////////////////////////////

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public-dev/**/*.*"],
        browser: "google chrome",
        port: 7000,
    });
});


gulp.watch('public-dev/css/*.css', ['minify-css'])

gulp.task('default', ['browser-sync'], function() {
    console.log("gulp gulp gulp")
})
