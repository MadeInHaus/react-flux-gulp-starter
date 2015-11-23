FROM node:4.2.2

RUN npm install -g gulp

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
RUN mkdir /install
ADD package.json /install/package.json
RUN cd /install && npm install && npm cache clear

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app

RUN ln -s /install/node_modules /usr/src/app/node_modules
RUN gulp production

ADD .docker/.env /user/src/app/.env

EXPOSE 3000

CMD node server.js
