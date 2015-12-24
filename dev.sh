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

function create_npm_archive() {
    if [ -f ".docker/node_modules.tar.gz" ]; then
        rm .docker/node_modules.tar.gz
    fi
    tar -cvzf .docker/node_modules.tar.gz -C .docker node_modules
    rm -Rf .docker/node_modules
}

function export_node_modules() {
    if [ -f ".docker/.npm_revision" ]; then
        CACHED_NPM_REVISION=$(<.docker/.npm_revision)
    else
        CACHED_NPM_REVISION=""
    fi

    CURRENT_NPM_REVISION="$(git rev-list -1 HEAD package.json)"

    PACKAGE_JSON_CHANGED="$(git status --porcelain | grep package.json)"

    if [ "$CURRENT_NPM_REVISION" != "$CACHED_NPM_REVISION" ] || [ -n "$PACKAGE_JSON_CHANGED" ]; then
        rm -Rf .docker/node_modules
        echo "Creating node_modules cache in .docker/node_modules"
        WEB_CONTAINER="$(docker-compose ps | grep -Eo '.+web[^ ]+')"
        docker cp $WEB_CONTAINER:/app/user/node_modules .docker/
        create_npm_archive
        echo $CURRENT_NPM_REVISION > .docker/.npm_revision
    else
        echo "Not updating npm cache"
    fi
}

docker-osx-dev install
boot2docker up
eval "$(boot2docker shellinit)"



# Make sure node_modules.tar.gz exists
if [ ! -f ".docker/node_modules.tar.gz" ]; then
    mkdir -p .docker/node_modules
    create_npm_archive;
fi

docker-compose -f docker-compose.dev.yml build

trap ctrl_c SIGINT SIGTERM INT TERM

docker events -f event=start | export_node_modules &
pids="$pids $!"


docker-osx-dev -c docker-compose.dev.yml &

pids="$pids $!"

docker-compose -f docker-compose.dev.yml up &

pids="$pids $!"


wait $pids
