var Beanstalkify = require("beanstalkify");
var secret = require("../secret.json");
var path = require("path");

var argv = require("yargs").argv;

var config = {
	app: "deploytest",
	ami:
		"64bit Amazon Linux 2017.03 v2.7.4 running Multi-container Docker 17.03.1-ce (Generic)"
};

// var project = process.argv[2] || "deploytest";
// var version = process.argv[3] || "1";
var project = argv.project || "deploytest";
var version = argv.version || "1";
var env = argv.env || "test-env";

// Deploy
var beanstalk = new Beanstalkify({
	accessKeyId: secret.accessKeyId,
	secretAccessKey: secret.secretAccessKey,
	region: "ap-southeast-2"
});

beanstalk
	.deploy({
		archiveFilePath: project + "-v" + version + ".zip",
		environmentName: env,
		awsStackName: config.ami,
		beanstalkConfig: [
			{
				Namespace: "aws:elasticbeanstalk:application:environment",
				OptionName: "APP_ENV",
				Value: "prod"
			},
			{
				Namespace: "aws:elasticbeanstalk:application:environment",
				OptionName: "NODE_ENV",
				Value: "production"
			}
		]
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
