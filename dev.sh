#!/bin/bash

pids=""

function ctrl_c() {
  echo "** Trapped CTRL-C"
  docker-compose -f docker-compose.dev.yml stop || true

  if [ -n "$pids" ]
    then
    kill -- $pids
fi

exit $?
}

CURRENT_DIR=${PWD##*/}
dockerName=${CURRENT_DIR//[^a-zA-Z0-9]/}
webContainerName="${dockerName}_web"

WEB_CONTAINER=""

function getWebContainer(){
  WEB_CONTAINER=$(docker ps -a | grep -Eo "$webContainerName[^ ]+") || true
}

docker volume create --name=yarn
docker volume create --name=npmCache
docker-compose  -p "$dockerName" -f docker-compose.dev.yml stop || true
docker-compose -p "$dockerName" -f docker-compose.dev.yml build web

trap ctrl_c SIGINT SIGTERM INT TERM ERR

docker-compose -p "$dockerName" -f docker-compose.dev.yml up -d
getWebContainer
echo "container is $WEB_CONTAINER"
docker attach --detach-keys='ctrl-d' $WEB_CONTAINER

ctrl_c
