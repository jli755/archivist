"use strict";const gulp=require("gulp"),uglify=require("gulp-uglify"),jshint=require("gulp-jshint"),insert=require("gulp-insert"),rename=require("gulp-rename"),sourcemaps=require("gulp-sourcemaps"),del=require("del"),gutil=require("gulp-util"),TestRunner=require("./test/config/test_runner"),banner=require("./banner"),src="src/**/*.js",dist="./dist";gulp.task("clean",e=>{del([dist+"/**/*"]).then(r=>{console.log("Deleted files and folders:\n",r.join("\n")),e()})}),gulp.task("jshint",()=>gulp.src(src).pipe(jshint()).pipe(jshint.reporter("default"))),gulp.task("test",["jshint"],e=>{new TestRunner(e)}),gulp.task("debug",["clean"],()=>gulp.src(src).pipe(insert.prepend(banner)).pipe(gulp.dest(dist))),gulp.task("uglify",["clean"],()=>gulp.src(src).pipe(sourcemaps.init()).pipe(uglify()).pipe(insert.prepend(banner)).pipe(rename(e=>{e.basename+=".min"})).pipe(sourcemaps.write("./")).pipe(gulp.dest(dist))),gulp.task("build",["clean","jshint","debug","uglify"]),gulp.task("default",["build"]);