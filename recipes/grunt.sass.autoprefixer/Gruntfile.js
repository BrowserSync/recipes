var browserSync = require('browser-sync');

module.exports = function (grunt) {
    grunt.initConfig({
        dirs: {
            css:  "app/css",
            scss: "app/scss"
        },
        watch: {
            options: {
                spawn: false
            },
            files: '<%= dirs.scss %>/**/*.scss',
            tasks: ['sass', 'autoprefixer', 'bs-inject']
        },
        sass: {
            dev: {
                files: {
                    '<%= dirs.css %>/main.css': '<%= dirs.scss %>/main.scss'
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 5 versions', 'ie 8']
            },
            css: {
                src: '<%= dirs.css %>/main.css',
                dest: '<%= dirs.css %>/main.css'
            }
        }
    });

    grunt.registerTask('bs-init', function () {
        browserSync({
            server: "./app"
        })
    });

    grunt.registerTask('bs-inject', function () {
        browserSync.reload('main.css');
    });

    // load npm tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // define default task
    grunt.registerTask('default', ['bs-init', 'watch']);
};