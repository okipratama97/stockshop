# Make node base image
FROM node:18-slim

# Specify working directory
WORKDIR /usr/app

# Copy package json file and yarn lock file
COPY ./package.json ./
COPY ./yarn.lock ./

# Run yarn install
RUN yarn install && yarn cache clean

# Copy the rest of the files in this folder into the image
COPY ./ ./

# Open port 3000
EXPOSE 3000

# The execute command
CMD [ "yarn", "start" ]
# CMD \[ -d "node_modules" \] && yarn start || yarn install && yarn start