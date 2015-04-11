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
	es = require('event-stream'),
	addSrc = require('gulp-add-src'),
	ngAnnotate = require('gulp-ng-annotate'),
	gutil = require('gulp-util'),
	strip = require('gulp-strip-comments'),
	config = require("./gulp-config"),
	package = require("./package.json");


gulp.task("clean", function() {
	return gulp.src(
		[
			config.build_dir + "/*",
			config.bin_dir + "/*"
		]
		,{
			read: false
		})
		.pipe(vinylPaths(del));
});

gulp.task("clean:css", function() {
	return del(config.build_dir + '/**/*.css');
});

gulp.task("html2js", function() {
	return gulp.src(
			config.app_files.templates
		)
		.pipe(html2js(
			{
				base: config.app,
				outputModuleName: 'templates'
			}
			))
	    .pipe(concat('templates.js'))
	    .pipe(gulp.dest(config.build_dir + "/assets"));
});

gulp.task('less:build', function () {
  return gulp.src(config.app_files.less)
    .pipe(less())
    .pipe(concat(package.name + "-" + package.version + ".css"))
    .pipe(gulp.dest(config.build_dir + "/assets/"));
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
	var myCss = String(config.build_dir + "/assets/" + package.name + "-" + package.version + ".css");
	
	return gulp.src(config.vendor_files.css, {nosort: true})
		.pipe(addSrc.append(config.build_dir + "/assets/" + package.name + "-" + package.version + ".css"))
		.pipe(strip())
		.pipe(concat(package.name + "-" + package.version + ".css"))
		.pipe(gulp.dest(config.build_dir + "/assets/"));
});

gulp.task('copy:build_js', function() {
	return gulp.src(config.app_files.js)
	.on('error', gutil.log)
	.pipe(copy(config.build_dir + "/assets/"));
});

gulp.task('copy:vendor_js', function() {
	return gulp.src(config.vendor_files.js, {nosort: true})
	.pipe(concat(config.build_dir + "vendors.js"))
	.pipe(gulp.dest(config.build_dir + '/assets/vendor/'));
});

gulp.task('copy:vendor_fonts', function() {
	return gulp.src(config.vendor_files.fonts)
	.pipe(gulp.dest(config.build_dir + "/fonts/"));
});

gulp.task('copy:vendor_fonts_compile', function() {
	return gulp.src(config.vendor_files.fonts)
	.pipe(gulp.dest(config.bin_dir + "/fonts/"));
});

gulp.task('copy:index', function() {
	return gulp.src("./src/index.html")
	.pipe(copy(config.build_dir + '/', {prefix:1}));
});

gulp.task('inject:index', function() {
	var target = gulp.src('./index.html', {cwd: config.build_dir}),
		sources = gulp.src(['./**/*.js',  '!./assets/vendor/**/*.js'], {cwd: config.build_dir})
		.pipe(angularFilesort()),
		vendors = gulp.src('./assets/vendor/**/*.js', {cwd: config.build_dir, read:false}),
		css = gulp.src('./**/*.css',{cwd: config.build_dir, read:false});

	return target.pipe(inject(es.merge(vendors, sources, css)))
	.pipe(gulp.dest(config.build_dir));
});

gulp.task('copy:index_compile', function() {
	return gulp.src("./src/index.html")
	.pipe(copy(config.bin_dir + '/', {prefix:1}));
});

gulp.task('inject:index_compile', function() {
	var target = gulp.src('./index.html', {cwd: config.bin_dir});
	var sources = gulp.src(['./**/*.js',  './**/*.css'], {cwd: config.bin_dir, read: false});

	return target.pipe(inject(sources))
	.pipe(gulp.dest(config.bin_dir));
});

gulp.task('compile_js', function() {
	var vendors = gulp.src(config.build_dir + '/assets/vendor/buildvendors.js'),
		sources =  gulp.src([config.build_dir + '/**/*.js', '!' + config.build_dir + '/assets/vendor/buildvendors.js'])
	.pipe(angularFilesort())
	.pipe(ngAnnotate());

	return es.merge(vendors, sources)
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
			'copy:vendor_js',
			'copy:vendor_fonts'
		],
		'copy:index',
		'inject:index'
	);
});


gulp.task('compile', function() {
	return runSequence(
		'less:compile',
		'concat:build_css',
		[
			'compile_js',
			'compile_css',
			'copy:vendor_fonts_compile'
		],
		'copy:index_compile',
		'inject:index_compile'
	);
});

gulp.task('csschange', function() {
	gutil.log("\n\tOne of less files has changed ...");
	return runSequence(
		'clean:css',
		'less:build',
		'concat:build_css'
	);
});

gulp.task('jschange', function() {
	gutil.log("\n\tOne of javascript files has changed ...");
	return runSequence(
		'copy:build_js',
		'copy:vendor_js',
		'copy:index',
		'inject:index'
	);
});

gulp.task('indexchange', function() {
	gutil.log("\n\tIndex file has changed ...");
	return runSequence(
		'copy:index',
		'inject:index'
	);
});

gulp.task('vendorchange', function() {
	gutil.log("\n\tConfig has changed ...");
	return runSequence(
		[
			'build'
		]
	);
});

gulp.task('templatechange', function() {
	gutil.log("\n\tOne of templates has changed ...");
	return runSequence(
		[
			'html2js'
		]
	);
});

gulp.task('watch', function() {
	gulp.watch('./src/app/**/*.js',['jschange']);

	gulp.watch('./src/app/**/*.less',['csschange']);

	gulp.watch('./src/index.html',['indexchange']);

	gulp.watch('./gulp-config.js',['vendorchange']);

	gulp.watch(config.app_files.templates,['templatechange']);
});

gulp.task('default',['build','watch']);
