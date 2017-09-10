# multi container docker deploy

This repo is a base project that will use webpack to build a react node app, put it into a docker container running alpine and deploy it to a multi container docker instance with a nginx proxy using elastic beanstalk.

## setup
 - an ECR repo
 - AWS toolkit 
 - an IAM role created in your AWS account called `dockerinstance` with the following policies:
`AmazonEC2ContainerRegistryReadOnly` `AWSElasticBeanstalkWebTier` `AWSElasticBeanstalkMulticontainerDocker` `AWSElasticBeanstalkWorkerTier`
 - `Makefile` variables configured to point to your account
 - `./secret.json` added to root directory in this format:
    ```javascript
        {
        "accessKeyId": "YOUR_KEY",
        "secretAccessKey": "YOUR_SECRET"
        }
    ```
## make commands
 - `make install` (installs deps)
 - `make build` (previous steps plus builds dist directory)
 - `make image` (previous steps plus makes docker image)
 - `make push` (previous steps plus pushes docker image to registry)
 - `make package` (previous steps plus makes elastic beanstalk package)
 - `make deploy` (previous steps plus deploys package)

