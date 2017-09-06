
PROJECT = test
VERSION = latest
REGION = ap-southeast-2
AWS_ACCOUNT_ID = 005361531463
REGISTRY = $(AWS_ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com
APP_IMAGE = $(REGISTRY)/$(PROJECT):$(VERSION)
KEY_DIR = keys
AWS_KEYS = creds.yml
#env
ENVIRONMENT = default






install:
	yarn
.PHONY: install

build:
	cp -r src dist
.PHONY: build

image:
	docker build . -t $(APP_IMAGE)
.PHONY: image

run:
	docker run -it $(APP_IMAGE)
.PHONY: run

login:
	aws ecr get-login --no-include-email --region ap-southeast-2 | sh
.PHONY: login

push:
	docker push $(APP_IMAGE)
.PHONY: push




test:
	echo 'test'
.PHONY: test

transfervolumes:
	docker build -t transferringvolumes:source ./transferringvolumes/source
	docker build -t transferringvolumes:destination ./transferringvolumes/destination

	docker volume create transfervolume

	docker run --mount source=transfervolume,target=/var/volume transferringvolumes:source
	sleep 1
	docker run --mount source=transfervolume,target=/var/volume transferringvolumes:destination
.PHONY: transfervolumes


clean:
	sudo rm -rf $(BUILD_DIR)
	sudo rm -rf Docker.aws.json
	sudo rm -rf node_modules
.PHONY: clean


deps:
	docker run --rm -t -v $(PWD):/opt/app -w /opt/app $(BUILD_IMAGE) \
		sh -c "npm set progress=false && npm --no-color install --default --quiet" 
.PHONY: deps
