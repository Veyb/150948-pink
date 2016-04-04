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

var copy = require("gulp-copy");
var clean = require("gulp-clean");

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
    .pipe(gulp.dest("css"))
    .pipe(nano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("css"))
    .pipe(server.reload({stream: true}));
});

gulp.task("clean", function() {
  gulp.src("build")
    .pipe(clean());
});

gulp.task("copy", function() {
  gulp.src("fonts/**/*.{woff,woff2}")
  .pipe(clean())
  .pipe(copy("build/"));
  // .pipe(gulp.dest("build"));
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html").on("change", server.reload);
  gulp.watch("js/**/*.js").on("change", server.reload);
});
