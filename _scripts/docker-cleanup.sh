#!/bin/bash
eval $(docker-machine env)
docker ps -a | grep 'weeks ago' | awk '{print $1}' | xargs docker rm
docker rmi $(docker images -f "dangling=true" -q)

