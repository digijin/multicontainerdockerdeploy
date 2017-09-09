
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


default: 
	
.PHONY: default



install:
	yarn
.PHONY: install

clean:
	rm -r dist
.PHONY: clean

build: clean
	cp -r src dist
.PHONY: build

image:
	docker build . -t $(APP_IMAGE)
.PHONY: image

run:
	docker run -it $(APP_IMAGE)
.PHONY: run

login:
	aws ecr get-login --no-include-email --region ap-southeast-2
.PHONY: login

push:
	docker push $(APP_IMAGE)
.PHONY: push

package: build
	node devops/package.js $(PROJECT) $(VERSION)
.PHONY: package

deploy: package
	node devops/deploy.js $(PROJECT) $(VERSION)
.PHONY: deploy




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





deps:
	docker run --rm -t -v $(PWD):/opt/app -w /opt/app $(BUILD_IMAGE) \
		sh -c "npm set progress=false && npm --no-color install --default --quiet" 
.PHONY: deps
