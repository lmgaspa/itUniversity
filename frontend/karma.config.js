module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('karma-sonarqube-execution-reporter'),
    ],
    client: {
      clearContext: false, // deixa os resultados visíveis no navegador
    },
    coverageReporter: {
      dir: 'reports',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },  // Relatório no terminal (stdout)
        { type: 'cobertura', file: 'ng-coverage.cobertura.xml' },  // GitLab coverage
        { type: 'lcovonly', file: 'ng-coverage.lcov.info' },  // SonarQube
      ],
    },
    junitReporter: {
      outputDir: 'reports',
      outputFile: 'ng-test.xunit.xml',
      useBrowserName: false,
    },
    sonarQubeExecutionReporter: {
      outputDir: 'reports',
      outputFile: 'ng-test.sonar.xml',
    },
    reporters: ['progress', 'kjhtml', 'junit', 'coverage', 'sonarqubeExecution'],
    browsers: ['Chrome', "ChromeHeadless"],  // Executa em modo headless
    singleRun: true,  // Executa os testes e fecha
  });
};
