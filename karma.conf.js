module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // Puedes agregar configuraciones para Jasmine aquí
      },
      clearContext: false // Mantiene visible el resultado de Jasmine en el navegador
    },
    jasmineHtmlReporter: {
      suppressAll: true // Elimina las trazas duplicadas
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/app'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_DEBUG, // Cambiado a LOG_DEBUG para más detalles
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
    files: [
      { pattern: 'src/**/*.spec.ts', watched: true } // Asegura que se carguen los archivos .spec.ts
    ]
  });
};



