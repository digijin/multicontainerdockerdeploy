
PROJECT = test
VERSION = latest
REGION = ap-southeast-2
AWS_ACCOUNT_ID = 005361531463

REGISTRY = $(AWS_ACCOUNT_ID).dkr.ecr.$(REGION).amazonaws.com
APP_IMAGE = $(REGISTRY)/$(PROJECT):$(VERSION)
#env
ENV = default


default: 
	
.PHONY: default



install:
	yarn
.PHONY: install

clean:
	rm -r dist
.PHONY: clean

build: clean
	npm run build
	cp src/server.js dist/server.js
	cp -r src/server dist/server
.PHONY: build

image: build
	docker build . -t $(APP_IMAGE)
.PHONY: image

getrole:
	aws iam get-role --role-name dockerinstance
.PHONY: getrole

run: image
	docker run -it -p 8080:8080 $(APP_IMAGE)
.PHONY: run

login:
	aws ecr get-login --no-include-email --region ap-southeast-2
.PHONY: login

push: image
	docker push $(APP_IMAGE)
.PHONY: push

package: push
	node devops/package.js --project=$(PROJECT) --version=$(VERSION) --image=$(APP_IMAGE)
.PHONY: package

deploy: package
	node devops/deploy.js --project=$(PROJECT) --version=$(VERSION) --env=$(ENV)
.PHONY: deploy


