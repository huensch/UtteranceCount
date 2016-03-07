# Base the container on the officially supported version of node
FROM node:5.1.0


# Set warning level for NPM to something sane as the node docker image ignores the standard Node defaults.
ENV NPM_CONFIG_LOGLEVEL warn


# Install global packages
RUN npm install -g nodemon@1.9.1


# Declare location where source code lives in the container
ENV APP_FOLDER="/source-code"


# Copy source code into container
COPY . $APP_FOLDER


# Open ports for access
# EXPOSE 4200 35729 49152


# The workdir must match the souce code directory
WORKDIR $APP_FOLDER
RUN npm set progress=false
RUN npm update
RUN npm install

# Default start process
CMD node index
