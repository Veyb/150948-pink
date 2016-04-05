"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var mqpacker = require("css-mqpacker");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");
var nano = require("gulp-cssnano");
var rename = require("gulp-rename");
var htmlmin = require("gulp-htmlmin");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");

var copy = require("gulp-copy");
var clean = require("gulp-contrib-clean");

var fs = require("fs");
var css = fs.readFileSync("css/style.css", "utf8");

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]}),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(nano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.reload({stream: true}));
});

gulp.task("minify-html", function() {
  return gulp.src("*.html")
    .pipe(htmlmin())
    .pipe(gulp.dest("build"));
});

gulp.task("imagemin", function() {
  return gulp.src("img/**/*.{png,jpg,gif,svg}")
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
    }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("uglify", function() {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("clean", function() {
  return gulp.src("build")
    .pipe(clean());
});

gulp.task("copy-fonts", function() {
  return gulp.src("fonts/**/*.{woff,woff2}")
    .pipe(copy("build"));
});

gulp.task("copy-html", function() {
  return gulp.src("*.html")
    .pipe(copy("build"));
});

gulp.task("copy-js", function() {
  return gulp.src("js/**/*.js")
    .pipe(copy("build/js"));
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "./build",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", ["copy-html"], server.reload);
  gulp.watch("js/**/*.js").on("change", ["copy-js"], server.reload);
});

gulp.task("build", ["clean", "copy-fonts", "imagemin", "minify-html", "style", "uglify"]);
