module.exports = function(config) {
  config.set({
    files: [
      // Third-party vendor files
      'public/js/lib/angular.js',
      'public/js/lib/angular-route.js',
      'public/js/lib/angular-mocks.js',
      'public/js/lib/satellizer.js',
      // App entry point
      'public/js/app.js',
      // App services, controllers, directives, filters, etc.
      'public/js/controllers/*.js',
      'public/js/services/*.js',
      // Unit tests
      'test/unit/**/*.test.js'
    ],

    autoWatch: true,

    frameworks: ['mocha', 'chai'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-chai',
      'karma-coverage'
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'public/js/app.js': ['coverage'],
      'public/js/controllers/*.js': ['coverage'],
      'public/js/services/*.js': ['coverage']
    },

    coverageReporter: {
      type: 'lcov',
      dir: 'test',
      subdir: 'coverage'
    }
  });
};
