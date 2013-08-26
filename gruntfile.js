/*jshint node:true */

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    bwr: grunt.file.readJSON('bower.json'),

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
          'src/styles/variables.less',
          'src/styles/sbtl-select.less',
          'src/styles/sbtl-option-list.less',
          'src/styles/sbtl-option.less',
          'src/styles/skin-default.less'
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

    bowerjson: {
      dev: {
        path: 'bower.json',
        name: '<%= pkg.name %>-dev',
        version: '<%= pkg.version %>',
        ignore: '<%= bwr.ignore %>',
        dependencies: '<%= bwr.dependencies %>'
      },
      dist: {
        path: 'dist/bower.json',
        name: '<%= pkg.name %>',
        version: '<%= pkg.version %>',
        main: ['subtle-select.js', 'subtle-select.css'],
        dependencies: '<%= bwr.dependencies %>'
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

  grunt.registerMultiTask('bowerjson', 'Write a bower.json file', function(/*args*/) {
    var path = this.data.path || 'bower.json'
      , conf;

    conf = {
      name: this.data.name,
      version: this.data.version,
      main: this.data.main || [],
      ignore: this.data.ignore || [],
      dependencies: this.data.dependencies || [],
      devDependencies: this.data.devDependencies || []
    };

    conf['private'] = this.data['private'] || false;

    grunt.file.write(path, JSON.stringify(conf, null, '  '));
    grunt.log.ok('Wrote bower config: ' + path);
  });

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
    'copy:dist',
    'bowerjson'
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
