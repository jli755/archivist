var path=require("path");module.exports=function(e){e.set({basePath:"",frameworks:["jasmine","sinon"],files:["node_modules/angular/angular.js","node_modules/angular-mocks/angular-mocks.js","source/**/*spec.ts"],exclude:[],preprocessors:{"source/**/*spec.ts":["webpack","sourcemap"]},reporters:["progress","coverage"],port:9876,colors:!0,logLevel:e.LOG_INFO,autoWatch:!0,browsers:["PhantomJS"],webpack:{cache:!0,devtool:"inline-source-map",stats:{colors:!0,reasons:!0},module:{preLoaders:[{test:/\.ts$/,exclude:/node_modules/,loader:"tslint-loader"}],loaders:[{test:/\.ts$/,loader:"ts-loader",exclude:/node_modules/}]},resolve:{extensions:["",".ts",".js"]}},webpackMiddleware:{noInfo:!0,stats:{colors:!0}},coverageReporter:{reporters:[{type:"lcovonly",subdir:".",file:"lcov.info"}],dir:"coverage/"}})};