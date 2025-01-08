module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'], // Ou mocha, dependendo do projeto
    files: ['src/**/*.spec.js'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    reporters: ['progress', 'junit', 'coverage'],
    coverageReporter: {
      type: 'lcov', // Formato lcov para SonarCloud
      dir: 'coverage/',
    },
    junitReporter: {
      outputDir: 'coverage/',
      outputFile: 'junit.xml',
    },
  });
};
