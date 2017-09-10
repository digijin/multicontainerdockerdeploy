# multi container docker deploy

This assumes you have a IAM role created in your AWS account called `dockerinstance` with the following policies:
`AmazonEC2ContainerRegistryReadOnly` `AWSElasticBeanstalkWebTier` `AWSElasticBeanstalkMulticontainerDocker` `AWSElasticBeanstalkWorkerTier`

steps:

 - clone this repo
 - add your keys to `./secret.json` in this format:
>{
    "accessKeyId": "YOUR_KEY",
    "secretAccessKey": "YOUR_SECRET"
    }

 - put your server details into the makefile variables
 - `make install` (installs deps)
 - `make build` (builds dist directory)
 - `make image` (makes docker image)
 - `make push` (pushes docker image to registry)
 - `make package` (makes zip with dockerrun)
 - `make deploy` (deploys zip)

