# Inherit from base node
FROM node:6.11.2-wheezy
ARG NPM_REGISTRY=http://registry.npmjs.org/
ARG PACKAGE_INSTALLER=npm

# Set our env vars
ENV PORT=3000\
    PATH=/app/user/node_modules/.bin:$PATH

# Create some needed directories
RUN mkdir -p /app/user && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* &&\
    if [ "$PACKAGE_INSTALLER" = "yarn" ]; then \
        npm install -g yarn; \
        ${PACKAGE_INSTALLER} config set ignore-optional false; \
    fi &&\
    ${PACKAGE_INSTALLER} config set registry "$NPM_REGISTRY"

WORKDIR /app/user
COPY package.json yarn.lock /app/user/
RUN $PACKAGE_INSTALLER install && \
    $PACKAGE_INSTALLER cache clean
COPY . /app/user
RUN NODE_ENV=production gulp production
