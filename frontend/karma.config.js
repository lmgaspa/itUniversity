module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    browsers: ['ChromeHeadless'],
    reporters: ['progress', 'coverage'], // Include 'coverage' in the reporters
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/', // Output folder
      subdir: '.',
      reporters: [
        { type: 'html', subdir: '.' },
        { type: 'lcovonly', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    singleRun: true,
    restartOnFileChange: false
  });
};
