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