module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'), // Adicionando o plugin de coverage
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {},
      clearContext: false // deixa os resultados visíveis no navegador
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'), // Pasta onde os relatórios serão gerados
      subdir: '.',
      reporters: [
        { type: 'html' },  // Gera relatório em HTML (pasta /coverage)
        { type: 'text-summary' } // Gera um resumo no terminal
      ]
    },
    reporters: ['progress', 'kjhtml', 'coverage'], // Adiciona coverage aos reports
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['FirefoxHeadless'],
    singleRun: false,
    restartOnFileChange: true
  });
};
