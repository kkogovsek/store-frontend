var gulp = require("gulp"),
	runSequence = require('run-sequence'),
	del = require('del'),
	vinylPaths = require('vinyl-paths'),
	html2js = require("gulp-html2js"),
	concat = require("gulp-concat"),
	less = require("gulp-less"),
	copy = require("gulp-copy"),
	inject = require("gulp-inject"),
	minify = require("gulp-minify"),
	uglify = require('gulp-uglify'),
	uglifycss = require('gulp-uglifycss'),
	angularFilesort = require('gulp-angular-filesort'),
	config = require("./gulp-config"),
	package = require("./package.json");


gulp.task("clean", function() {
	return gulp.src(
		[
			config.build_dir + "/*"
			,config.bin_dir + "/*"
		]
		,{
			read: false
		})
		.pipe(vinylPaths(del));
});

gulp.task("html2js", function() {
	return gulp.src(
			config.app_files.templates
		)
		.pipe(html2js(
			{
				base: config.app
			}
			))
	    .pipe(concat('templates.js'))
	    .pipe(gulp.dest(config.build_dir + "/assets"));
});

gulp.task('less:build', function (cb) {
  return gulp.src(config.app_files.less)
    .pipe(less())
    .pipe(concat(package.name + "-" + package.version + ".css"))
    .pipe(gulp.dest(config.build_dir + "/assets/"), cb);
});

gulp.task('less:compile', function () {
  return gulp.src(config.app_files.less)
    .pipe(less(
    	{
          cleancss: true,
          compress: true
        }
    ))
    .pipe(concat(package.name + "-" + package.version + ".css"))
    .pipe(gulp.dest(config.build_dir + "/assets/"));
});

gulp.task('concat:build_css', function() {
	var files = config.vendor_files.css;
	files.push(config.build_dir + "/assets/" + package.name + "-" + package.version + ".css");
	return gulp.src(files)
	.pipe(concat(package.name + "-" + package.version + ".css"))
	.pipe(gulp.dest(config.build_dir + "/assets/"));
});

gulp.task('copy:build_js', function() {
	return gulp.src(config.app_files.js)
	.pipe(copy(config.build_dir + "/assets/"));
});

gulp.task('copy:vendor_js', function() {
	return gulp.src(config.vendor_files.js)
	.pipe(copy(config.build_dir + "/assets/", {prefix:10}));
});

gulp.task('copy:vendor_css', function() {
	return gulp.src(config.vendor_files.css)
	.pipe(copy(config.build_dir + "/assets/", {prefix:10}));
});

gulp.task('copy:index', function() {
	return gulp.src("./src/index.html")
	.pipe(copy(config.build_dir + '/', {prefix:1}));
});

gulp.task('inject:index', function() {
	var target = gulp.src('./index.html', {cwd: config.build_dir});
	var sources = gulp.src(['./**/*.js', './**/*.css'], {cwd: config.build_dir})
		.pipe(angularFilesort());

	return target.pipe(inject(sources))
	.pipe(gulp.dest(config.build_dir));
});

gulp.task('copy:index_compile', function() {
	return gulp.src("./src/index.html")
	.pipe(copy(config.bin_dir + '/', {prefix:1}));
});


gulp.task('inject:index_compile', function() {
	var target = gulp.src('./index.html', {cwd: config.bin_dir});
	var sources = gulp.src(['./**/*.js', './**/*.css'], {cwd: config.bin_dir, read: false});

	return target.pipe(inject(sources))
	.pipe(gulp.dest(config.bin_dir));
});

gulp.task('compile_js', function() {
	return gulp.src(config.build_dir + '/**/*.js')
	.pipe(angularFilesort())
	.pipe(uglify())
	.pipe(concat(package.name + "-" + package.version + ".min.js"))
	.pipe(gulp.dest(config.bin_dir + '/assets'));
});

gulp.task('compile_css', function() {
	return gulp.src(config.build_dir + '/assets/' + package.name + "-" + package.version + ".css")
	.pipe(uglifycss())
	.pipe(gulp.dest(config.bin_dir + '/assets/'));
});

gulp.task('build', function() {
	return runSequence(
		'clean',
		'html2js',
		'less:build',
		[
			'concat:build_css',
			'copy:build_js',
			'copy:vendor_js'
		],
		'copy:index',
		'inject:index'
	);
});


gulp.task('compile', function() {
	return runSequence(
		'less:compile',
		'concat:build_css',
		'compile_js',
		'compile_css',
		'copy:index_compile',
		'inject:index_compile'
	);
});