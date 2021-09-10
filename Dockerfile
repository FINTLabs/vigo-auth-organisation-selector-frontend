FROM node:10-alpine as build
COPY . /src
WORKDIR /src
RUN yarn && yarn build
