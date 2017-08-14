
REGISTRY = localhost:5000
APP_IMAGE = $(REGISTRY)/$(PROJECT):$(VERSION)
KEY_DIR = keys
AWS_KEYS = creds.yml

#env
ENVIRONMENT = default


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
