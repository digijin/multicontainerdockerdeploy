# multicontainerdockerdeploy


steps:

clone this repo

add your keys
put your server details into the makefile variables

make install (installs deps)

make build (builds dist directory)

make image (makes docker image)

make push (pushes docker image to registry)

make package (makes zip with dockerrun)

make deploy (deploys zip)


add access for ec2 to see ecr
http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_docker.container.console.html#docker-images-private