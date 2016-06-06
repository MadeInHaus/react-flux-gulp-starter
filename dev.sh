#!/bin/bash

pids=""

function ctrl_c() {
    echo "** Trapped CTRL-C"
    docker-compose -f docker-compose.dev.yml stop || true

    if [ -n "$pids" ]
    then
        kill -- $pids
    fi

    pkill -f docker-osx-dev

    exit $?
}

CURRENT_DIR=${PWD##*/}
dockerName=${CURRENT_DIR//[^a-zA-Z0-9]/}
webContainerName="${dockerName}_web"

WEB_CONTAINER=""

function getWebContainer(){
    WEB_CONTAINER=$(docker ps -a | grep -Eo "$webContainerName[^ ]+") || true
}

function install_notification_server() {
    hash terminal-notifier &> /dev/null
    if [ $? -eq 1 ]; then
        echo "terminal-notifier not installed, installing now"
        brew install terminal-notifier
    fi

    hash notify-send-server &> /dev/null
    if [ $? -eq 1 ]; then
        echo "notify-send-server not installed, installing now"
        curl -L https://github.com/fgrehm/notify-send-http/releases/download/v0.2.0/server-darwin_amd64 > /usr/local/bin/notify-send-server
        chmod +x /usr/local/bin/notify-send-server
    fi
}

function create_npm_archive() {
    if [ -f ".docker/node_modules.tar.gz" ]; then
        rm .docker/node_modules.tar.gz
    fi
    gzip .docker/node_modules.tar
}

function export_node_modules() {
    if [ -f ".docker/.npm_revision" ]; then
        CACHED_NPM_REVISION=$(<.docker/.npm_revision)
    else
        CACHED_NPM_REVISION=""
    fi

    CURRENT_NPM_REVISION="$(git rev-list -1 HEAD package.json)"
    PACKAGE_JSON_CHANGED="$(git status --porcelain | grep package.json || echo '')"

    if [ "$CURRENT_NPM_REVISION" != "$CACHED_NPM_REVISION" ] || [ -n "$PACKAGE_JSON_CHANGED" ]; then
        rm -Rf .docker/node_modules
        echo "Creating node_modules cache in .docker/node_modules"
        getWebContainer

        if [ -z "$WEB_CONTAINER" ]; then
            echo "No web container yet, creating temporary one"
            TMP_ID=$(docker create "$webContainerName")
            docker cp "$TMP_ID":/app/user/node_modules - > .docker/node_modules.tar
            docker rm -v "$TMP_ID"
        else
            echo "Web container is ${WEB_CONTAINER}"
            docker cp "$WEB_CONTAINER":/app/user/node_modules - > .docker/node_modules.tar
        fi
        echo "node_modules dir copied"
        create_npm_archive
        echo "npm archive created"
        echo "$CURRENT_NPM_REVISION" > .docker/.npm_revision
        echo ".npm_revision updated to ${CURRENT_NPM_REVISION}"
    else
        echo "Not updating npm cache"
    fi
}


USE_BOOT2DOCKER=false

while [[ $# > 0 ]]
do
key="$1"

case $key in
    -b|--boot2docker)
    USE_BOOT2DOCKER=true
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

if [ "$USE_BOOT2DOCKER" = true ]; then
    boot2docker up
    eval "$(boot2docker shellinit)"

else
    docker-machine start default || true
    eval "$(docker-machine env default)"
fi

# Skip Dependencies isn't supported in older versions
install_notification_server
docker-osx-dev install --skip-dependencies --remove-shared-folders || docker-osx-dev install --skip-dependencies || docker-osx-dev install
pkill -f docker-osx-dev || true

docker-compose  -p "$dockerName" -f docker-compose.dev.yml stop || true


# Make sure node_modules.tar.gz exists
if [ ! -f ".docker/node_modules.tar.gz" ]; then
    mkdir -p .docker
    tar cvf .docker/node_modules.tar --files-from /dev/null
    create_npm_archive;
fi

docker-compose -p "$dockerName" -f docker-compose.dev.yml build web

trap ctrl_c SIGINT SIGTERM INT TERM ERR

export_node_modules

docker-osx-dev sync-only -c docker-compose.dev.yml || true

docker-osx-dev -c docker-compose.dev.yml | sed "s/$/$(printf '\r')/" &
pids="$pids $!"

PORT=12345 notify-send-server &
pids="$pids $!"

docker-compose -p "$dockerName" -f docker-compose.dev.yml up -d
getWebContainer
echo "container is $WEB_CONTAINER"
docker attach --detach-keys='ctrl-c' $WEB_CONTAINER;

ctrl_c
