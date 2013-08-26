module.exports = function(config) {
  config.set({
    autoWatch: true,
    singleRun: false,
    frameworks: ['mocha'],
    files: [
      'bower_components/angular/angular.js',
      'src/scripts/module.js',
      'src/scripts/directives/*.js',
      'test/spec/**/*.js'
    ],
    browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome'],
    reporters: ['progress'],
    plugins: [
      'karma-mocha',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],
    logLevel: config.LOG_INFO
  });
};
