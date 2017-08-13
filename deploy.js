

var Application = require('beanstalkify');

var secret = require('./secret.json');

var application = new Application(
    {
        accessKeyId: secret.accessKeyId,
        secretAccessKey: secret.secretAccessKey,
        region: 'ap-southeast-2'
    }
);

// Deploy
application.deploy(
{
    archiveFilePath: 'deploytest-v3.zip',
    environmentName: 'deploytest-test-env',
    awsStackName: '64bit Amazon Linux 2017.03 v2.7.2 running Multi-container Docker 17.03.1-ce (Generic)',
    beanstalkConfig: [
    ]
}
).then(function(data){
    console.log(data); // {app_name: 'test-website', app_version: 'foo', env_name: 'test-website-prod', env_url: 'tech-website-12345.ap-southeast-2.elasticbeanstalk.com'}
}, function(reason){
    console.warn(reason);
});

// Clean application versions
// application.cleanApplicationVersions('application name'); // Returns a promise