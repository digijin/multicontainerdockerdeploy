var Beanstalkify = require("beanstalkify");
var secret = require("./secret.json");

var config = {
  app: "deploytest",
  env: "deploy-test-env",
  ami:
    "64bit Amazon Linux 2017.03 v2.7.2 running Multi-container Docker 17.03.1-ce (Generic)"
};

// Deploy
var beanstalk = new Beanstalkify({
  accessKeyId: secret.accessKeyId,
  secretAccessKey: secret.secretAccessKey,
  region: "ap-southeast-2"
});

beanstalk
  .deploy({
    archiveFilePath: config.app + "-v3.zip",
    environmentName: config.env,
    awsStackName: config.ami,
    beanstalkConfig: []
  })
  .then(
    function(data) {
      console.log(data); // {app_name: 'test-website', app_version: 'foo', env_name: 'test-website-prod', env_url: 'tech-website-12345.ap-southeast-2.elasticbeanstalk.com'}
    },
    function(reason) {
      console.warn(reason);
    }
  );

// Clean application versions
// application.cleanApplicationVersions('application name'); // Returns a promise
