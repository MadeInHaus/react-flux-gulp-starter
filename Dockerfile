# Inherit from Heroku's stack
FROM heroku/cedar:14

# Internally, we arbitrarily use port 3000
ENV PORT 3000
# Which version of node?
ENV NODE_ENGINE 4.2.2
# Locate our binaries
ENV PATH /app/heroku/node/bin/:/app/user/node_modules/.bin:$PATH

# Create some needed directories
RUN mkdir -p /app/heroku/node /app/.profile.d
WORKDIR /app/user

# Install node
RUN curl -s https://s3pository.heroku.com/node/v$NODE_ENGINE/node-v$NODE_ENGINE-linux-x64.tar.gz | tar --strip-components=1 -xz -C /app/heroku/node
RUN /app/heroku/node/bin/npm install npm -g
RUN /app/heroku/node/bin/npm set registry http://registry.npmjs.org/ && /app/heroku/node/bin/npm set strict-ssl false

# Install vim
RUN apt-get update && apt-get --yes --force-yes install vim

# Export the node path in .profile.d
RUN echo "export PATH=\"/app/heroku/node/bin:/app/user/node_modules/.bin:\$PATH\"" > /app/.profile.d/nodejs.sh

ADD package.json /app/user/
ADD .docker/node_modules.tar.gz /app/user/
RUN /app/heroku/node/bin/npm install
ADD . /app/user/
