var gulp = require("gulp"),
	jade = require("gulp-jade"),
	less = require("gulp-less"),
	typescript = require("gulp-typescript"),
	connect = require("gulp-connect");


var path = {
	out: {
		jade: "./app/templates/index.jade",
		less: "./app/public/styles/main.less",
		typescript: "./app/public/scripts/main.ts"
	},
	bin: {
		html: "./bin/",
		css: "./bin/css/",
		js: "./bin/js/"
	},
	watch: {
		jade: "./app/templates/**/*.jade",
		less: "./app/public/styles/**/*.less",
		typescript: "./app/public/scripts/**/*.ts"
	}
};

gulp.task("jade", function() {
	gulp.src(path.out.jade)
		.pipe(jade())
		.pipe(gulp.dest(path.bin.html))
		.pipe(connect.reload())
});

gulp.task("less", function() {
	gulp.src(path.out.less)
		.pipe(less())
		.pipe(gulp.dest(path.bin.css))
		.pipe(connect.reload())
});

gulp.task("typescript", function() {
	gulp.src(path.out.typescript)
		.pipe(typescript())
		.pipe(gulp.dest(path.bin.js))
		.pipe(connect.reload())
});

gulp.task("server", function() {
	connect.server({
		root: ["./bin/"],
		livereload: true
	});
	//connect.serverClose();
});

gulp.task("watch", function() {
	gulp.watch(path.watch.jade, ["jade"]),
	gulp.watch(path.watch.less, ["less"]),
	gulp.watch(path.watch.typescript, ["typescript"])
});

gulp.task("default", ["jade","less","typescript","watch","server"]);