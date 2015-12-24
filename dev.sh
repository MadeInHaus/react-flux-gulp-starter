#!/bin/bash
set -e

pids=""

function ctrl_c() {
    echo "** Trapped CTRL-C"
    docker-compose stop
    if [ -n "$pids" ]
    then
        kill -- $pids
    fi

    exit $?
}

boot2docker up

CURRENT_NPM_REVISION="$(git rev-list -1 HEAD package.json)"

if [ ! -d ".docker/" ]; then
    mkdir .docker/
fi

if [ -f ".docker/.npm_revision" ]; then
    CACHED_NPM_REVISION=$(<.docker/.npm_revision)
else
    CACHED_NPM_REVISION=""
fi

docker-compose -f docker-compose.dev.yml build

trap ctrl_c SIGINT SIGTERM INT TERM

docker-compose -f docker-compose.dev.yml up &

pids="$pids $!"

if [ "$CURRENT_NPM_REVISION" != "$CACHED_NPM_REVISION" ]; then
    rm -Rf .docker/node_modules
    echo "Creating node_modules cache in .docker/node_modules"
    WEB_CONTAINER="$(docker-compose ps | grep -Eo '.+web[^ ]+')"
    docker cp $WEB_CONTAINER:/app/user/node_modules .docker/
    rm .docker/node_modules.tar.gz
    tar -cvzf .docker/node_modules.tar.gz -C .docker node_modules
    rm -Rf .docker/node_modules
    echo $CURRENT_NPM_REVISION > .docker/.npm_revision
fi

docker-osx-dev -c docker-compose.dev.yml
