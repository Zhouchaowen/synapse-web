SHELL := /bin/bash

# ==============================================================================
# Building containers

# $(shell git rev-parse --short HEAD)
VERSION := 1.0

NGINX_HOST := 10.2.0.104
NGINX_HTTP_PORT := 80
NGINX_API_PROXY_PASS := http://10.2.0.104:3000


all: synapse-web

synapse-web:
	docker build \
		-f dockerfile \
		-t synapse-web:$(VERSION) \
		--build-arg BUILD_REF=$(VERSION) \
		--build-arg BUILD_DATE=`date -u +"%Y-%m-%dT%H:%M:%SZ"` \
		.

run-synapse-web:
	docker run -itd --name=synapse-web \
		--network host \
		-e NGINX_HOST=$(NGINX_HOST) \
		-e NGINX_HTTP_PORT=$(NGINX_HTTP_PORT) \
		-e NGINX_API_PROXY_PASS=$(NGINX_API_PROXY_PASS) \
		synapse-web:$(VERSION)

