
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

getrole:
	aws iam get-role --role-name dockerinstance
.PHONY: getrole

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


