

var Application = require('beanstalkify');


var application = new Application(
    {
        accessKeyId: 'XXX',
        secretAccessKey: 'XXX',
        region: 'ap-southeast-2'
    }
);

// Deploy
application.deploy(
{
    archiveFilePath: 'PATH TO ZIP FILE',
    environmentName: 'CNAME',
    awsStackName: '64bit Amazon Linux 2015.03 v2.0.0 running Node.js',
    beanstalkConfig: [
        Beanstalk options
        ....
    ]
}
).then(function(data){
    console.log(data); # {app_name: 'test-website', app_version: 'foo', env_name: 'test-website-prod', env_url: 'tech-website-12345.ap-southeast-2.elasticbeanstalk.com'}
});

// Clean application versions
application.cleanApplicationVersions('application name'); // Returns a promise