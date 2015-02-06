'use strict'

var pkg = require('./bower.json')

module.exports = function(grunt){
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		express: {
			"main": {
				options: {
					script: "server.js"
				}
			}
		},
		watch: {
			options: {
				livereload: true,
				livereloadOnError: false,
				spawn: false
			},
			files:['src/**/*.js'],
			tasks:['karma:during_watch']
		},
		jshint: {
			src: ['src/**/*.js']
		},
		karma: {
			options: {
				frameworks: ['jasmine'],
				files: ['src/**/*.js'],
				logLevel: 'ERROR',
				autowatch: true,
				singleRun: true
			},
			during_watch: {
				browsers: ['phantomJS']
			},
			build: {
				browsers: ['Chrome', 'Firefox', 'IE']
			}
		}
	});

	grunt.registerTask('build', ['express', 'karma:build']);
	grunt.registerTask('serve', ['jshint', 'express', 'watch']);
}