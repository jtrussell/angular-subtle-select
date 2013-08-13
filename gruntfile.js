/*jshint node:true */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: ['gruntfile.js'],
      src: ['src/scripts/**/*.js']
    },

    clean: {
      buildArtifacts: ['.tmp', 'dist']
    },

    concat: {
      scripts: {
        src: [
          'src/scripts/module.js',
          'src/scripts/directives/*.js'
        ],
        dest: '.tmp/subtle-select.js'
      },
      styles: {
        src: [
          'src/styles/mixins.less',
          'src/styles/variables.less'
        ],
        dest: '.tmp/subtle-select.less'
      }
    },

    less: {
      all: {
        src: '<%= concat.styles.dest %>',
        dest: '.tmp/subtle-select.css'
      }
    },

    cssmin: {
      all: {
        src: ['<%= less.all.dest %>'],
        dest: '.tmp/subtle-select.min.css'
      }
    },

    uglify: {
      all: {
        src: '<%= concat.scripts.dest %>',
        dest: '.tmp/subtle-select.min.js'
      }
    },

    copy: {
      dist: {
        expand: true,
        flatten: true,
        src: '.tmp/*.{js,css}',
        dest: 'dist/'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: 'src/scripts/**/*.js',
        tasks: ['concat:scripts']
      },
      styles: {
        files: 'src/styles/**/*.less',
        tasks: ['concat:styles', 'less']
      },
      examples: {
        files: 'examples/**/*.html',
        tasks: [] // Just want to trigger a live reload
      }
    },

    connect: {
      examples: {
        options: {
          middleware: function(connect) {
            return [
              require('connect-livereload')(),
              connect['static']('src/scripts'),
              connect['static']('examples'),
              connect['static']('.tmp')
            ];
          }
        }
      }
    },

    open: {
      examples: {
        path: 'http://localhost:8000/basic.html'
      }
    },

    karma: {
      spec: {
        options: {
          configFile: 'karma.spec.conf.js',
          singleRun: true,
          autoWatch: false
        }
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('test', [
    'jshint',
    'karma'
  ]);

  grunt.registerTask('dist', [
    'clean',
    'concat',
    'less',
    'cssmin',
    'uglify',
    'copy:dist'
  ]);

  grunt.registerTask('server', [
    'clean',
    'concat',
    'less',
    'connect:examples',
    'open:examples',
    'watch'
  ]);

  grunt.registerTask('default', [
    'test',
    'dist'
  ]);

};
