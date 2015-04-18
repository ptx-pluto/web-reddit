'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        pathConfig: {
            src: 'src',
            build: 'build',
            venders: 'venders'
        },

        pkg: grunt.file.readJSON('package.json'),

        watch: {

            all: {
                files: [
                    'src/**/*.js',
                    'src/templates/**/*.hbs',
                    'src/styles/scss/**/*.scss'
                ],
                tasks: ['build']
            }

        },

        browserify: {

            build: {
                files: {
                    'build/scripts/application.js': 'src/app/application.js'
                }
            }

        },

        emberTemplates: {

            options: {
                templateName: function (tName) {
                    return tName.replace('src/templates/', '');
                },
                handlebarsPath: 'venders/handlebars/handlebars.js',
                templateCompilerPath: 'venders/ember/ember-template-compiler.js'
            },

            build: {
                files: {
                    'build/scripts/templates.js': 'src/templates/**/*.hbs'
                }
            }

        },

        compass: {

            options: {
                sassDir: 'src/styles/scss'
            },

            build: {
                options: {
                    cssDir: '<%= pathConfig.build %>/styles'
                }
            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', [
        'browserify:build',
        'emberTemplates:build',
        'compass:build'
    ]);

};

