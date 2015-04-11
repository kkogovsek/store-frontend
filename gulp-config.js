module.exports = {
	build_dir: "./build",
	bin_dir: "./bin",
	app: "./src/app",
	app_files: {
		js: ["./src/app/**/*.js"],
		templates: ["./src/app/**/*.tpl.html",'./src/common/templates/*.tpl.html'],
		less: "./src/less/main.less"
	},
	vendor_files: {
		js: [
			'bower_components/angular/angular.js',
			'bower_components/jquery/dist/jquery.js',
			'bower_components/bootstrap/dist/js/bootstrap.js',
			'bower_components/angular-ui-router/release/angular-ui-router.js',
			'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
			'bower_components/angular-facebook/lib/angular-facebook.js'
		],
		css: [
			'bower_components/bootstrap/dist/css/bootstrap.min.css',
			'bower_components/fontawesome/css/font-awesome.min.css'
		],
		fonts: [
			'bower_components/fontawesome/fonts/fontawesome-webfont.woff'
		]
	}
};