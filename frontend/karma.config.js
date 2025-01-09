module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false,  // Deixa os resultados visíveis no navegador
    },
    reporters: ['progress', 'kjhtml'],  //
    port: 9876,
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessWindows: {
        base: 'ChromeHeadless',
        flags: ['--disable-gpu', '--disable-extensions', '--remote-debugging-port=9222', '--headless'],
      }
    },
    singleRun: true,
    restartOnFileChange: true,
  });
};
