/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./e2e/**/*.e2e-spec.ts'],
  capabilities:
      {browserName: 'chrome', chromeOptions: {args: ['--disable-web-security', '--no-sandbox']}},
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {showColors: true, defaultTimeoutInterval: 30000, print: function() {}},
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({project: 'e2e'});
    require('connect')().use(require('serve-static')('www')).listen(4200);
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
  }
};
