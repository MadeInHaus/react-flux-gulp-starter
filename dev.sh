#!/bin/bash
set -e
docker-osx-dev install
boot2docker up
eval "$(boot2docker shellinit)"

docker-compose -f docker-compose.dev.yml build

docker-compose -f docker-compose.dev.yml up &
docker-osx-dev -c docker-compose.dev.yml

trap "trap - SIGTERM && kill -- -$$" SIGINT SIGTERM EXIT
