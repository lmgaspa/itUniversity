module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('karma-sonarqube-reporter'),
    ],
    client: {
      clearContext: false, // mantém os resultados visíveis na interface de relatório
    },
    coverageReporter: {
      dir: 'reports/coverage',
      subdir: '.',
      reporters: [
        { type: 'html' },  // Gera relatório HTML para fácil análise
        { type: 'text-summary' },  // Mostra resumo de cobertura no terminal
        { type: 'cobertura', file: 'coverage.xml' },  // Cobertura para GitLab
        { type: 'lcovonly', file: 'coverage.lcov.info' },  // LCOV para SonarCloud
      ],
    },
    junitReporter: {
      outputDir: 'reports/junit',
      outputFile: 'test-results.xml',
      useBrowserName: false,
    },
    sonarQubeReporter: {
      basePath: 'src',
      filePattern: '**/*spec.ts',
      outputDir: 'reports/sonar',
      encoding: 'utf-8',
      legacyMode: false,
      reportName: 'sonar-report.xml',
    },
    reporters: ['progress', 'kjhtml', 'junit', 'coverage', 'sonarqube'],
    browsers: ['ChromeHeadless'], // Apenas modo headless para CI/CD
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
      },
    },
    singleRun: true,  // Garante que execute e finalize no ambiente de CI/CD
    restartOnFileChange: false,  // Não reinicia ao alterar arquivos em ambiente CI/CD
  });
};
