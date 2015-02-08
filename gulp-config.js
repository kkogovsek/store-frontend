module.exports = {
	build_dir: "./build",
	bin_dir: "./bin",
	app: "./src/app",
	app_files: {
		js: ["./src/app/**/*.js"],
		templates: ["./src/app/**/*.tpl.html"],
		less: "./src/less/main.less"
	},
	vendor_files: {
		js: [
			'bower_components/angularjs/angular.min.js'
		],
		css: [
		]
	}
};