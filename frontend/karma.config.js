module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
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
    junitReporter: {
      outputDir: 'test-reports', // Diretório onde os relatórios JUnit serão salvos
      outputFile: 'junit-report.xml', // Nome do arquivo de saída do relatório
      useBrowserName: false, // Remove o nome do navegador do arquivo
      suite: '', // Nome do conjunto de testes (pode ser vazio)
    },
    reporters: ['progress', 'kjhtml', 'coverage', 'junit'], // Adiciona coverage aos reports
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['FirefoxHeadless'],
    singleRun: false,
    restartOnFileChange: true
  });
};
